import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import * as z from 'zod';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Login schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = loginSchema.parse(body);
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        name: true,
        email: true,
        hashedPassword: true,
        userRole: true,
        image: true,
        location: true,
        verified: true,
      },
    });
    
    // Check if the user exists
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Verify the password
    const passwordMatch = user.hashedPassword ? 
      await bcrypt.compare(validatedData.password, user.hashedPassword) : 
      false;
    
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Create a JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.userRole,
      },
      process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
      {
        expiresIn: validatedData.rememberMe ? '30d' : '1d',
      }
    );
    
    // Prepare user data (omitting sensitive information)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.userRole,
      image: user.image,
      location: user.location,
      verified: user.verified,
    };
    
    // Create the response
    const response = NextResponse.json({
      user: userData,
      token,
    });
    
    // Set token in a cookie for server-side use
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: validatedData.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
      path: '/',
      sameSite: 'lax',
    });
    
    // Return the response with cookies
    return response;
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 