//SCHEMA FOR DEPARTMENTS
import { Schema, model, models} from "mongoose";

const DepartmentSchema = new Schema(
    {
        name: {type: "string", required: true, unique: true},
        created_by: {type: "string", required: true},
    },
    {
        timestamps: true
    });

const Department = models.Department || model("Department", DepartmentSchema);

export default Department;