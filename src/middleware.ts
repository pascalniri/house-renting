import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define the paths that don't require authentication
const publicPaths = ['/api/auth/login', '/api/auth/forgot-password', '/api/auth/reset-password', '/auth', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is in the public paths list
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Allow public access to GET /api/properties for visitor pages
  if (request.method === 'GET' && pathname.startsWith('/api/properties')) {
    return NextResponse.next();
  }

  // Protect /portal routes and /api/auth (except public ones)
  if (pathname.startsWith('/portal') || (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/'))) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      // If it's an API route, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      
      // If it's a page, redirect to login
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'super-secret-fallback-key-do-not-use-in-production'
      );
      // Verify token
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*', '/api/:path*'],
};
