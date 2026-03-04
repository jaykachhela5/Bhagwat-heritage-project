import mongoose, { Document, Schema } from "mongoose";

export interface IPathshala extends Document {
  name: string;
  age?: number;
  parentName?: string;
  phone?: string;
  email?: string;
  course?: string;
  message?: string;
  date: Date;
}

const pathshalaSchema = new Schema<IPathshala>({
  name: { type: String, required: true },
  age: { type: Number },
  parentName: { type: String },
  phone: { type: String },
  email: { type: String },
  course: { type: String },
  message: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IPathshala>("Pathshala", pathshalaSchema);
