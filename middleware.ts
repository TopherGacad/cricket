import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function to verify JWT token
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

    // Token is valid, allow the request to continue
    console.log("Token valid. Proceeding with request.");
    return NextResponse.next();
  } catch (error) {
    console.log("Invalid token. Redirecting to login...");
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if token is invalid or decoding fails
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/setup/:path*', '/tickets/:path*', '/api/:path*', '/dashboard'],
};
