import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Create a response that redirects to home page
    const response = NextResponse.json({ success: true });
    
    // Clear the auth token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0), // Set expiration to epoch start to clear the cookie
      path: '/',
      sameSite: 'lax',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
} 