import mongoose, { Document, Schema } from "mongoose";

export interface IMedia extends Document {
  filename: string;
  path: string;
  cloudinary_id: string;
  uploadDate: Date;
}

const mediaSchema = new Schema<IMedia>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export default mongoose.model<IMedia>("Media", mediaSchema);
