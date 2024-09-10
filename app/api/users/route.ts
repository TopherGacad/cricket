//API FOR USER ACCOUNTS
import connect from "@/lib/db";
import User from "@/lib/models/users";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;

//this will create new data
export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });

  } catch (error: any) {
    return new NextResponse("This is my first api." + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    //receive the data to post request
    const body = await request.json();
    console.log("Received body:", body);  
    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/users:", error); 
    return new NextResponse("Error in creating user" + error.message, {
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