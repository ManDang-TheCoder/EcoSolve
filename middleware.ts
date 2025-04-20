import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const STATIC_ASSET_REGEX = /\.(jpg|jpeg|png|gif|svg|webp|css|js|mp4|webm|mp3|woff|woff2|ttf|eot)$/;

// List of protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/dashboard',
  '/report-issue',
  '/community/create',
  '/map/my-reports',
  '/settings',
];

// Public API routes (that handle their own auth)
const publicApiRoutes = [
  '/api/auth/login',
  '/api/auth/signup',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip static assets
  if (STATIC_ASSET_REGEX.test(pathname)) {
    return NextResponse.next();
  }
  
  // Check if the route is a protected API route
  if (pathname.startsWith('/api/') && !publicApiRoutes.includes(pathname)) {
    // For API routes, check the Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      // Verify the token
      verify(token, process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production');
      // If verification succeeds, continue to the API route
      return NextResponse.next();
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid or expired token' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
  
  // Check if this is a protected page route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isProtectedRoute) {
    // For browser routes, check for cookie or localStorage
    // Since we can't access localStorage directly in middleware,
    // we'll rely on cookies or URL redirect
    
    // Check if the user is authenticated via cookie
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      // Redirect to login page with a return URL
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    
    try {
      // Verify the token
      verify(token, process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production');
      // If verification succeeds, continue to the protected route
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to login
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  // For all other routes, continue normally
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // All paths except for specific static assets
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Include API routes for API authentication
    '/api/:path*',
  ],
}; 