import mongoose, { Document, Schema } from "mongoose";

export interface IDevotee extends Document {
  name: string;
  email: string;
  city?: string;
  message?: string;
  createdAt: Date;
}

const devoteeSchema = new Schema<IDevotee>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IDevotee>("Devotee", devoteeSchema);
