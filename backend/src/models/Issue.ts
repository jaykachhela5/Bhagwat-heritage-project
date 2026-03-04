import mongoose, { Document, Schema, Types } from "mongoose";

export interface IIssue extends Document {
  bookId: Types.ObjectId;
  studentName: string;
  phone?: string;
  issueDate: Date;
  returnDate?: Date;
  status: string;
}

const issueSchema = new Schema<IIssue>({
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  studentName: { type: String, required: true },
  phone: { type: String },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, default: "Issued" },
});

export default mongoose.model<IIssue>("Issue", issueSchema);
