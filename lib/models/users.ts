import mongoose, { Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
    {
        email: {type: "string", required: true, unique: true},
        fname: {type: "string", required: true},
        lname: {type: "string", required: true},
        department_id: {type: Schema.Types.ObjectId, ref:'Department', required: true},
        password: {type: "string", required: true},
        mobileNo: {type: "string", required: true, unique: true},
        role: {
            type: "string",
            enum: ["superadmin" , "staff", "employee"],
            required: true
        },
        profilePic: {
            data: Buffer,  
            contentType: String, 
          }, 
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