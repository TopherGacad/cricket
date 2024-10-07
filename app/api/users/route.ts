//API FOR USER ACCOUNTS
import connect from "@/lib/db";
import User from "@/lib/models/users";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const ObjectId = require("mongoose").Types.ObjectId;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

//this will create new data
export const GET = async (request: Request) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return new NextResponse("Unauthorized: No token provided", { status: 401 });
    }

    let decoded: string | JwtPayload;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return new NextResponse("Invalid token", { status: 401 });
    }

    if (typeof decoded !== "object" || !("id" in decoded)) {
      return new NextResponse("Invalid token payload", { status: 401 });
    }

    await connect();
    const user = await User.findById(decoded.id).select("-password"); // Exclude password from response

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching user: " + error.message, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const token = request.headers.get("cookie")?.split("; ").find(row => row.startsWith("authToken"))?.split("=")[1];

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Missing authentication token" }),
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

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

    // Extract required fields from request body
    const { fname, lname, department_id, role, mobileNo, email, password } = await request.json();

    // Validate all required fields
    if (!fname || !lname || !department_id || !role || !mobileNo || !email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Ensure `department_id` is cast to an ObjectId
    const newUser = new User({
      fname,
      lname,
      department_id: new ObjectId(department_id), // Casting department_id to ObjectId
      role,
      mobileNo,
      email,
      password,
      createdBy: new ObjectId(userId), // Assuming the logged-in user is creating this user
    });

    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/users:", error);
    return new NextResponse("Error in creating user: " + error.message, {
      status: 500,
    });
  }
};


export const PATCH = async (request: Request) =>{
  try{
    const body = await request.json();
    const {userId, newEmail} = body;

    await connect(); 
    //check whether the userid or email exist
    if (!userId || !newEmail){
      return new NextResponse(
        JSON.stringify({message: "ID or New Email not found"}),
        {status: 400}
      );
    }

    //check whether the id is valid
    if(!Types.ObjectId.isValid(userId)){
      return new NextResponse(
        JSON.stringify({message: "Invalid user ID"}),
        {status: 400}
      );
    }
    
    //if the user exist, find the user and then update
    const updatedUser =  await User.findOneAndUpdate(
      { _id: new ObjectId(userId)},
      { email: newEmail },
      { new: true }
    )

    if(!updatedUser){
      return new NextResponse(
        JSON.stringify({message: "User not found in the database"}),
        {status: 400}
      )
    }
    return new NextResponse(
      JSON.stringify({message: "User Updated", user: updatedUser}),
      {status: 200}
    )

  }catch(error: any){
    return new NextResponse("Error in updating user:" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) =>{
  try{
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");

    if( !userId){
      return new NextResponse(
        JSON.stringify({messaged: "ID or New email not found"}),{
          status: 400
        }
      );
    }

    await connect();
    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId)
    );

    if(!deletedUser) {
      return new NextResponse(
        JSON.stringify({message: "User not found in the database"}),{
          status: 400
        }
      );
    }

    //if no error return successful
    return new NextResponse(
      JSON.stringify({message: "User is deleted", user: deletedUser}),{
        status: 200
      }
    );


  }catch (error: any){
    return new NextResponse("Error in deleting User" + error.message, {
      status: 500,
    });
  }
};