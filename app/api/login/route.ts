import connect from "@/lib/db";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    await connect();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if the provided password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // If login is successful
    
    return new NextResponse(
      JSON.stringify({ message: "Login successful", user }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/login:", error);
    return new NextResponse("Error in login" + error.message, { status: 500 });
  }
};
