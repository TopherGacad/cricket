import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Secret key from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Middleware function to verify JWT token
export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  // Define protected routes for pages (frontend)
  const protectedPages = ['/dashboard', '/settings', '/account'];

  // Define protected routes for API (backend)
  const protectedAPI = ['/api/protected'];

  const requestPath = req.nextUrl.pathname;

  // 1. Check if the request is for a protected **Page**
  if (protectedPages.includes(requestPath)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if token is missing
    }

    try {
      jwt.verify(token, JWT_SECRET); // Verify JWT token
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if token is invalid
    }
  }

  // 2. Check if the request is for a protected **API route**
  if (protectedAPI.includes(requestPath)) {
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Return 401 if token is missing
    }

    try {
      jwt.verify(token, JWT_SECRET); // Verify JWT token
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 }); // Return 401 if token is invalid
    }
  }

  // If the request is not for a protected route, proceed as normal
  return NextResponse.next();
}

// Apply middleware globally
export const config = {
  matcher: ['/dashboard'], // Apply to specific routes
};
