import mongoose, { Document, Schema } from 'mongoose';

// Defining the Message interface
interface IMessage extends Document {
    senderName: string;
    senderEmail: string;
    message: string;
}

// Defining the Message schema
const messageSchema: Schema<IMessage> = new Schema({
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    message: { type: String, required: true }
},{timestamps: true});

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;