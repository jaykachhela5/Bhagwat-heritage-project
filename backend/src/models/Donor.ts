import mongoose, { Document, Schema } from "mongoose";

export interface IDonor extends Document {
  name: string;
  email: string;
  phone?: string;
  amount: number;
  message?: string;
  date: Date;
}

const donorSchema = new Schema<IDonor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  amount: { type: Number, required: true },
  message: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IDonor>("Donor", donorSchema);
