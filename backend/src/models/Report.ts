import mongoose, { Document, Schema } from "mongoose";

export interface IExpenseItem {
  label: string;
  amount: number;
  note?: string;
}

export interface IReport extends Document {
  title: string;
  monthLabel: string;
  summary: string;
  highlights: string[];
  expenseBreakdown: IExpenseItem[];
  images: string[];
  imagePublicIds: string[];
  videoUrl?: string;
  pdfName?: string;
  pdfUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const expenseItemSchema = new Schema<IExpenseItem>(
  {
    label: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    note: { type: String, trim: true },
  },
  { _id: false },
);

const reportSchema = new Schema<IReport>(
  {
    title: { type: String, required: true, trim: true },
    monthLabel: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    highlights: { type: [String], default: [] },
    expenseBreakdown: { type: [expenseItemSchema], default: [] },
    images: { type: [String], default: [] },
    imagePublicIds: { type: [String], default: [] },
    videoUrl: { type: String, trim: true },
    pdfName: { type: String, trim: true },
    pdfUrl: { type: String, trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

reportSchema.index({ isPublished: 1, createdAt: -1 });

export default mongoose.model<IReport>("Report", reportSchema);
