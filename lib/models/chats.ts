import mongoose, {Schema, model, models} from "mongoose";

const ChatSchema = new Schema({
    sender: {type: mongoose.Schema.Types.ObjectId ,ref: 'User', required: true},
    message: {type: String, required: true},
    timestamp: { type: Date, default: Date.now }
})


const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;