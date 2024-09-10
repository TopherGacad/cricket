import { Schema, model, models} from "mongoose";
import { useState } from "react";
import bcrypt from "bcryptjs";

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
    });
    // Hash the password before saving
    UserSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();
    
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });

const User = models.User || model("User", UserSchema);

export default User;