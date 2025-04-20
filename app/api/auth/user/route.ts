import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

// Get authenticated user data
export async function GET(request: NextRequest) {
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
    
    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
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
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    
    // Check if the error is due to an invalid token
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { message: 'An error occurred while fetching user data' },
      { status: 500 }
    );
  }
} 