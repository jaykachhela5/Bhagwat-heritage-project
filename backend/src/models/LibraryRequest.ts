import mongoose, { Document, Schema } from "mongoose";

export interface ILibraryRequest extends Document {
  name: string;
  mobile: string;
  bookTitle: string;
  reason?: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
}

const libraryRequestSchema = new Schema<ILibraryRequest>({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  bookTitle: { type: String, required: true },
  reason: { type: String },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILibraryRequest>("LibraryRequest", libraryRequestSchema);
