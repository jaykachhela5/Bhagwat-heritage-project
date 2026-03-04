import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  category?: string;
  isbn?: string;
  quantity?: number;
  available?: number;
  description?: string;
  createdAt: Date;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  isbn: { type: String },
  quantity: { type: Number },
  available: { type: Number },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBook>("Book", bookSchema);
