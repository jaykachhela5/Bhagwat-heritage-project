import mongoose, { Document, Schema } from "mongoose";

export interface ICultural extends Document {
  title?: string;
  description?: string;
  image?: string;
}

const culturalSchema = new Schema<ICultural>({
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

export default mongoose.model<ICultural>("Cultural", culturalSchema);
