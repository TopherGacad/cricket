//SCHEMA FOR CATEGORIES
import { Schema, model, models} from "mongoose";

const CategoriesSchema = new Schema(
    {
        categoryName: {type: "string", required: true, unique: true},
        priorityLevel: {type: "string", required: true},
    },
    {
        timestamps: true
    });

const Categories = models.Categories || model("Categories", CategoriesSchema);

export default Categories;