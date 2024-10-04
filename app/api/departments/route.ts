import connect from "@/lib/db";
import User from "@/lib/models/users";
import Department from "@/lib/models/departments";
import { NextResponse } from "next/server";
import { Types } from 'mongoose'; 
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), { status: 400 });
    }

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found in the database" }), { status: 400 });
    }

    const departments = await Department.find({ user: new Types.ObjectId(userId) });
    return new NextResponse(JSON.stringify(departments), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching departments: " + error.message, { status: 500 });
  }
};

export const POST = async (request: Request) => {
    try {
      // Extract token from the cookies
      const token = request.headers.get("cookie")?.split('; ').find(row => row.startsWith('authToken'))?.split('=')[1];
  
      if (!token) {
        return new NextResponse(
          JSON.stringify({ message: "Missing authentication token" }),
          { status: 401 }
        );
      }
  
      // Verify the token and extract user information
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id;
  
      // Extract department name from the request body
      const { name } = await request.json();
  
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing userId" }),
          { status: 400 }
        );
      }
  
      await connect();
      const user = await User.findById(userId);
      if (!user) {
        return new NextResponse(
          JSON.stringify({ message: "User not found in the database" }),
          { status: 404 }
        );
      }
  
      const newDepartment = new Department({
        name,
        user: new Types.ObjectId(userId),
      });
  
      await newDepartment.save();
      return new NextResponse(
        JSON.stringify({ message: "Department created", department: newDepartment }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({ message: "Error in creating department: " + error.message }),
        { status: 500 }
      );
    }
  };