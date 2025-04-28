import mongoose, { Schema, Document, Model } from "mongoose";

// Defining the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  phone: string;
  address: string;
  city?: string;
  country?: string;
  state?: string;
  isAdmin: boolean;
}

// Defining the User schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], unique: true },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
    image: { type: String },
    phone: { type: String, required: [true, "Phone is required"] },
    address: { type: String, required: [true, "Address is required"] },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String },
    state: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Defining the User model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
