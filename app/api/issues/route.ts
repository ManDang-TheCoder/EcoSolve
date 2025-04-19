import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

// Validation schema for environmental reports
const reportSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(2000),
  location: z.string().min(3),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  category: z.string(),
  potentialSolutions: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get and validate request body
    const body = await request.json();
    const validatedData = reportSchema.parse(body);
    
    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email || '' },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Create the environmental report
    const report = await prisma.environmentalReport.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        location: validatedData.location,
        latitude: validatedData.latitude,
        longitude: validatedData.longitude,
        urgency: validatedData.urgency,
        category: validatedData.category,
        potentialSolutions: validatedData.potentialSolutions,
        images: validatedData.images || [],
        userId: user.id,
      },
    });
    
    // Update user's impact points for creating a report
    await prisma.user.update({
      where: { id: user.id },
      data: {
        impactPoints: {
          increment: 10,
        },
      },
    });
    
    // Create notifications for experts who might be interested
    const experts = await prisma.user.findMany({
      where: {
        userRole: 'EXPERT',
        expertiseCategories: {
          some: {
            name: {
              contains: validatedData.category,
            },
          },
        },
      },
    });
    
    // Send notifications to relevant experts
    if (experts.length > 0) {
      await prisma.$transaction(
        experts.map(expert => 
          prisma.notification.create({
            data: {
              userId: expert.id,
              message: `New environmental issue reported: ${validatedData.title}`,
              type: 'REPORT_STATUS',
              link: `/reports/${report.id}`,
            },
          })
        )
      );
    }
    
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error('Error creating environmental report:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create environmental report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const category = searchParams.get('category');
    const urgency = searchParams.get('urgency');
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter conditions
    const where: any = {};
    
    if (category) where.category = category;
    if (urgency) where.urgency = urgency;
    if (status) where.status = status;
    if (location) where.location = { contains: location, mode: 'insensitive' };
    
    // Get reports with pagination
    const [reports, totalCount] = await prisma.$transaction([
      prisma.environmentalReport.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
              expertAnswers: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.environmentalReport.count({ where }),
    ]);
    
    return NextResponse.json({
      reports,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching environmental reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch environmental reports' },
      { status: 500 }
    );
  }
} 