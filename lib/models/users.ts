import { Schema, model, models} from "mongoose";
import { useState } from "react";

const UserSchema = new Schema(
    {
        email: {type: "string", required: true, unique: true},
        fname: {type: "string", required: true},
        lname: {type: "string", required: true},
        department: {type: "string", required: true},
        password: {type: "string", required: true}
        //add profile pic boss carl 
    },
    {
        timestamps: true
    }
)

const User = models.User || model("User", UserSchema);

export default User;