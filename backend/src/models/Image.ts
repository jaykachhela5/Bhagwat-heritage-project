import mongoose, { Document, Schema } from "mongoose";

export interface IImage extends Document {
  imageUrl: string;
  publicId: string;
}

const imageSchema = new Schema<IImage>(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IImage>("Image", imageSchema);
