import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



// Define role-based access control (RBAC) rules
const rbacRules = {
  superadmin: [
    "/dashboard",
    "/dashboard/tickets/new-ticket",
    "/dashboard/tickets/queue",
    "/dashboard/tickets/resolved",
    "/dashboard/setup/profiles",
    "/dashboard/setup/departments",
    "/dashboard/setup/categories",
    "/dashboard/setup/accounts",  // Superadmin has full access
  ],
  staff: [
    "/dashboard",  // Access to the main dashboard
    "/dashboard/tickets/new-ticket",
    "/dashboard/tickets/queue",
    "/dashboard/tickets/resolved",
    "/dashboard/setup/profiles",  // Only access to the profiles in the setup section
  ],
  employee: [
    "/dashboard/tickets/new-ticket",
    "/dashboard/tickets/queue",
    "/dashboard/tickets/resolved",
    "/dashboard/setup/profiles"
  ]
};

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
    const userRole = decodedPayload.role;

    console.log("User Role:", userRole);

    // Get the current path
    const currentPath = req.nextUrl.pathname;

    // Check if the user's role allows access to the current path
    //@ts-ignore
    const allowedPaths = rbacRules[userRole] || [];
    //@ts-ignore
    const isAuthorized = allowedPaths.some((allowedPath) => {
      if (allowedPath.includes(':path*')) {
        const basePath = allowedPath.replace(':path*', ''); // Remove the wildcard
        return currentPath.startsWith(basePath); // Check if the current path starts with the base path
      }
      return allowedPath === currentPath; // Exact match
    });

    // If the path is not authorized for the role, redirect to unauthorized page and clear cookies
    if (!isAuthorized) {
      console.log(`User role '${userRole}' is not authorized to access '${currentPath}'. Redirecting to /unauthorized`);
      const response = NextResponse.redirect(new URL('/unauthorized', req.url));
      response.cookies.set('authToken', '', { path: '/', maxAge: 0 }); // Clear the cookie
      return response;
    }

    // Optional: Verify expiration (exp) if present
    if (decodedPayload.exp && Date.now() >= decodedPayload.exp * 1000) {
      throw new Error('Token has expired');
    }

    // Token is valid, allow the request to continue
    console.log("Token valid. Proceeding with request.");
    return NextResponse.next();
  } catch (error) {
    console.log("Invalid token. Redirecting to login and clearing cookies...");
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('authToken', '', { path: '/', maxAge: 0 }); // Clear the cookie on invalid token
    return response;
  }
}

// Export matcher to apply the middleware to specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/setup/:path*', '/tickets/:path*', '/dashboard'],
};
