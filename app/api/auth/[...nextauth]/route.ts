import { NextResponse } from 'next/server';

// This file provides a compatibility layer for any components that try to use next-auth
// Instead of using next-auth, we have a custom auth system in this project

// Handle GET requests (next-auth session checks)
export async function GET() {
  return NextResponse.json({ 
    error: "This application uses a custom authentication system instead of next-auth", 
    message: "Please use the custom auth endpoints instead"
  }, { status: 200 });
}

// Handle POST requests (signin/signout)
export async function POST() {
  return NextResponse.redirect(new URL('/auth/signin', process.env.NEXTAUTH_URL));
} 