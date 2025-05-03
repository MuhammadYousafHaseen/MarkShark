import mongoose, { Document, Schema } from 'mongoose';

export interface IMeeting extends Document {
  date: Date;
  tz: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

const MeetingSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    tz: { type: String, required: true },
    slot: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    reason: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Meeting || mongoose.model<IMeeting>('Meeting', MeetingSchema);
