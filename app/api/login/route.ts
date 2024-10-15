import connect from "@/lib/db";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load the JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    await connect();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify("User not found"), { status: 404 });
    }

    // Check if the provided password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Generate JWT token on successful login
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1d" } // Token expires in 1 day
    );
    

    console.log("User role: ", user.role);
    // Return the JWT token along with the user's role
    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
        token, // Send the token back to the client
        role: user.role // Include the role for frontend redirection
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/login:", error);
    return new NextResponse(JSON.stringify("Error in login: " + error.message), { status: 500 });
  }
};
