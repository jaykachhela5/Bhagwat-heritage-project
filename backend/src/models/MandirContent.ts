import mongoose, { Document, Schema } from "mongoose";

export interface IMandirContent extends Document {
  title?: string;
  subtitle?: string;
  about?: string;
  morningTime?: string;
  afternoonTime?: string;
  eveningTime?: string;
}

const mandirSchema = new Schema<IMandirContent>(
  {
    title: { type: String },
    subtitle: { type: String },
    about: { type: String },
    morningTime: { type: String },
    afternoonTime: { type: String },
    eveningTime: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IMandirContent>("MandirContent", mandirSchema);
