import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function to verify JWT token and role-based access
export function middleware(req: NextRequest) {
  // Define paths that should be excluded from middleware checks
  const excludedPaths = ['/api/login', '/login'];

  // Skip the middleware for excluded paths
  if (excludedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Extract the token from cookies
  const token = req.cookies.get('authToken')?.value;

  // Check if the token exists
  if (!token) {
    console.log("Token missing. Redirecting to login...");
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if token is missing
  }

  try {
    // Decode the JWT without using jsonwebtoken (Edge compatible)
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) {
      throw new Error('Invalid token format');
    }

    // Decode the payload using Base64
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());

    // Optional: Verify expiration (exp) if present
    if (decodedPayload.exp && Date.now() >= decodedPayload.exp * 1000) {
      throw new Error('Token has expired');
    }

    // Extract the role from the decoded payload
    const userRole = decodedPayload.role;
    console.log(decodedPayload.role);
    // Define role-based access rules
    const isSuperadminPath = req.nextUrl.pathname.startsWith('/admin');
    const isEmployeePath = req.nextUrl.pathname.startsWith('/dashboard');

    // Check if user has superadmin role for accessing admin paths
    if (isSuperadminPath && userRole !== 'superadmin') {
      console.log("Unauthorized. Superadmin access required.");
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect unauthorized users to login
    }
    
    // Check if user has employee role for accessing employee paths
    if (isEmployeePath && userRole !== 'employee') {
      console.log("Unauthorized. Employee access required.");
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect unauthorized users to login
    }

    // Token and role are valid, allow the request to continue
    console.log("Token and role valid. Proceeding with request.");
    return NextResponse.next();
  } catch (error) {
    console.log("Invalid token. Redirecting to login...");
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if token is invalid or decoding fails
  }
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',   // Admin dashboard and subpaths
    '/admin/tickets/:path*',     // Admin tickets and subpaths
    '/admin/setup/:path*',       // Admin setup and subpaths
    '/dashboard/:path*',         // Employee dashboard and subpaths
    '/dashboard/tickets/:path*', // Employee tickets and subpaths
    '/dashboard/setup/:path*',   // Employee setup and subpaths
    '/api/:path*'                // API routes
  ],
};
