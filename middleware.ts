import { NextResponse, NextRequest } from 'next/server';

const STATIC_ASSET_REGEX = /\.(jpg|jpeg|png|gif|svg|webp|css|js|mp4|webm|mp3|woff|woff2|ttf|eot)$/;

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content-Security-Policy specifically tuned for Chrome compatibility
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.mapbox.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com; " +
    "img-src 'self' data: blob: https: *; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "connect-src 'self' https: wss:; " +
    "frame-src 'self' https:; " +
    "media-src 'self' https:; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "upgrade-insecure-requests;"
  );
  
  // Add Strict-Transport-Security for HTTPS enforcement
  // In development, we don't want to set this header
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  
  // Add Referrer-Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add Permissions-Policy
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=("self"), fullscreen=("self")');
  
  // Set proper caching for static assets
  if (STATIC_ASSET_REGEX.test(request.nextUrl.pathname)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Optimize Next.js-specific paths
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Add Feature-Policy header for additional security
  response.headers.set('Feature-Policy', 'accelerometer "none"; camera "none"; geolocation "self"; gyroscope "none"; magnetometer "none"; microphone "none"; payment "none"; usb "none"');
  
  return response;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/_next/static/:path*',
  ],
}; 