import mongoose, { Document, Schema } from "mongoose";

export interface IMember extends Document {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
}

const memberSchema = new Schema<IMember>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMember>("Member", memberSchema);
