import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import * as z from 'zod';

// Form validation schema
const baseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
  location: z.string().optional(),
  agreeTerms: z.boolean(),
});

const volunteerSchema = baseSchema.extend({
  interests: z.string().optional(),
});

const expertSchema = baseSchema.extend({
  expertise: z.string().min(10, "Please describe your expertise in detail"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  expertiseCategories: z.string().min(2, "Please select your areas of expertise"),
});

const signupFormSchema = z.discriminatedUnion('userType', [
  z.object({ userType: z.literal('VOLUNTEER'), ...volunteerSchema.shape }),
  z.object({ userType: z.literal('EXPERT'), ...expertSchema.shape }),
  z.object({ userType: z.literal('USER'), ...baseSchema.shape }),
]).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body against the schema
    const validatedData = signupFormSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    // Determine user role
    const userRole = validatedData.userType === 'EXPERT' 
      ? 'EXPERT' 
      : validatedData.userType === 'VOLUNTEER' 
        ? 'VOLUNTEER' 
        : 'USER';
    
    // Create the base user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        hashedPassword,
        userRole,
        location: validatedData.location,
        interests: validatedData.userType === 'VOLUNTEER' && validatedData.interests 
          ? [validatedData.interests] 
          : [],
      },
    });
    
    // For experts, create additional data
    if (validatedData.userType === 'EXPERT') {
      // Add expertise categories
      await prisma.expertCategory.create({
        data: {
          name: validatedData.expertiseCategories,
          userId: user.id,
        },
      });
      
      // Update user with bio and expertise
      await prisma.user.update({
        where: { id: user.id },
        data: {
          bio: validatedData.bio,
          expertise: validatedData.expertise,
        },
      });
    }
    
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'An error occurred while creating the user account' },
      { status: 500 }
    );
  }
} 