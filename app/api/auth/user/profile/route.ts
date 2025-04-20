import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';
import * as z from 'zod';

// Schema for profile updates
const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  bio: z.string().optional(),
  expertise: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  image: z.string().url("Invalid image URL").optional(),
  socialLinks: z.record(z.string().url()).optional(),
});

// Update user profile
export async function PUT(request: NextRequest) {
  try {
    // Get token from the Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify JWT token
    const decoded = verify(
      token, 
      process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production'
    ) as { id: string };
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = profileUpdateSchema.parse(body);
    
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        ...validatedData,
      },
      select: {
        id: true,
        name: true,
        email: true,
        userRole: true,
        image: true,
        location: true,
        bio: true,
        expertise: true,
        verified: true,
        impactPoints: true,
        skills: true,
        interests: true,
        joinedAt: true,
        socialLinks: true,
      },
    });
    
    // Return updated user data
    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: updatedUser 
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    // Token verification errors
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    
    // Prisma errors
    if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
      return NextResponse.json(
        { message: 'Database error', error: error.message },
        { status: 400 }
      );
    }
    
    // Generic errors
    return NextResponse.json(
      { message: 'An error occurred while updating profile' },
      { status: 500 }
    );
  }
} 