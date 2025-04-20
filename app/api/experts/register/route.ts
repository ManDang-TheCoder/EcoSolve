import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { z } from 'zod';
import { Session } from "next-auth";

// Custom session type with user ID
interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  }
}

// Schema for expert registration
const ExpertSchema = z.object({
  title: z.string().min(2),
  specialties: z.string(), // JSON string for SQLite compatibility
  credentials: z.string(), // JSON string for SQLite compatibility
  bio: z.string().min(50),
  consultationFee: z.number().min(0).optional(),
});

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession() as CustomSession;
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate the request body
    const validatedData = ExpertSchema.parse(body);
    
    // Check if the user already has an expert profile
    const existingExpert = await prisma.expert.findUnique({
      where: { userId: session.user.id },
    });
    
    if (existingExpert) {
      return NextResponse.json(
        { error: "You already have an expert profile" },
        { status: 400 }
      );
    }
    
    // Create the expert profile
    const expert = await prisma.expert.create({
      data: {
        title: validatedData.title,
        specialties: validatedData.specialties, // Store JSON string directly
        credentials: validatedData.credentials, // Store JSON string directly
        bio: validatedData.bio,
        consultationFee: validatedData.consultationFee,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    
    return NextResponse.json(expert, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error("[EXPERT_REGISTER]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 