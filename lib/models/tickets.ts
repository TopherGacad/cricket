//SCHEMA FOR TICKETS
import mongoose, {Schema, model, models} from "mongoose";

const TicketSchema = new Schema(
    {
        assignee: {type: "string"},
        subject: {type: "string", required: true},
        user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        categories_id: {type: mongoose.Schema.Types.ObjectId, ref:'Categories', required: true},
    },
    {
        timestamps: true
    });

const Ticket = models.Ticket || model("Tciket", TicketSchema);

export default Ticket;