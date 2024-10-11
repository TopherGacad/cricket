import connect from "@/lib/db";
import User from "@/lib/models/users";
import Department from "@/lib/models/departments";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

export const GET = async (request: Request) => {
  try {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
      return new NextResponse(
        JSON.stringify({ message: "Missing authentication cookie" }),
        { status: 401 }
      );
    }

    // Extract token from cookies
    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("authToken"))
      ?.split("=")[1];

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Missing authentication token" }),
        { status: 401 }
      );
    }

    // Verify JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or expired authentication token" }),
        { status: 403 }
      );
    }

    const userId = decoded.id;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    await connect();

    // Fetch all departments and populate the 'user' field with user details
    const departments = await Department.find().populate('user', 'fname lname');

    if (!departments) {
      return new NextResponse(
        JSON.stringify({ message: "No departments found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(departments), { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching departments:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error in fetching departments: " + error.message }),
      { status: 500 }
    );
  }
};


export const POST = async (request: Request) => {
  try {
    // Extract token from the cookies
    const token = request.headers
      .get("cookie")
      ?.split("; ")
      .find((row) => row.startsWith("authToken"))
      ?.split("=")[1];

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Missing authentication token" }),
        { status: 401 }
      );
    }

    // Verify the token and extract user information
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or expired authentication token" }),
        { status: 403 }
      );
    }

    const userId = decoded.id;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    // Extract department name from the request body
    const { name } = await request.json();

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
    console.error("Error in creating department:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error in creating department: " + error.message }),
      { status: 500 }
    );
  }
};
