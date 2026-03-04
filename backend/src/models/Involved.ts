import mongoose, { Document, Schema } from "mongoose";

export interface IInvolved extends Document {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  interest?: string;
  message?: string;
}

const involvedSchema = new Schema<IInvolved>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    city: { type: String },
    interest: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IInvolved>("Involved", involvedSchema);
