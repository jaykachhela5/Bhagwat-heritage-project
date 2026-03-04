import mongoose, { Document, Schema } from "mongoose";

export interface IDonation extends Document {
  amount: number;
  name: string;
  email: string;
  status: string;
}

const donationSchema = new Schema<IDonation>(
  {
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model<IDonation>("Donation", donationSchema);
