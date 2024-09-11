import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    // Clear the session cookie
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('authToken', '', { expires: new Date(0) }); // Adjust 'authToken' to your cookie name
    return response;
  } catch (error) {
    console.error("Error in POST /api/logout:", error);
    return NextResponse.json({ message: 'Error in logout' }, { status: 500 });
  }
};
