//API FOR CATEGORIES
import connect from "@/lib/db"; //db connection
import Categories from "@/lib/models/categories"; //categories db schema
import { Types } from "mongoose"; //mongodb variable types
import { NextResponse } from "next/server"; 

const ObjectId = require("mongoose").TypeObjectId;

export const GET = async () => {
    try {
        await connect();
        const categories = await Categories.find();
        return new NextResponse(JSON.stringify(categories), { status: 200});

    } catch ( error : any) {
        return new NextResponse("Error loading categories" + error.message , {
            status : 500,
        })
    }
}

export const POST = async (request : Request) => {
    try{
        const body = await request.json()
        
        await connect();

        const newCategory = new Categories(body);
        await newCategory.save();

        return new NextResponse(
            JSON.stringify({message: "Category is Created", category: newCategory}),
            { status: 200 }
        )

    } catch (error : any) {
        return new NextResponse("Error in creating categories" + error.message , {
            status: 500,
        })
    }
}
