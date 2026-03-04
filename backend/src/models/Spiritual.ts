import mongoose, { Document, Schema } from "mongoose";

export interface ISpiritual extends Document {
  title?: string;
  description?: string;
  image?: string;
}

const spiritualSchema = new Schema<ISpiritual>({
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

export default mongoose.model<ISpiritual>("Spiritual", spiritualSchema);
