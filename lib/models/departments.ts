//SCHEMA FOR DEPARTMENTS
import mongoose, { Schema, model, models } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: { type: "string", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Department = models.Department || model("Department", DepartmentSchema);

export default Department;
