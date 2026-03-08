import mongoose, { Document, Schema } from "mongoose";

export type KundliGender = "Male" | "Female";
export type KundliLanguage = "English" | "Hindi" | "Marathi" | "Gujarati";
export type KundliPaymentMethod = "UPI" | "Razorpay" | "Stripe";
export type KundliPaymentStatus = "Pending" | "Paid" | "Failed";
export type KundliOrderStatus = "Pending" | "Processing" | "Completed";

export interface IKundliServiceItem {
  title: string;
  pages: number;
  price: number;
}

export interface IKundliRequest extends Document {
  orderId: string;
  invoiceNumber: string;
  fullName: string;
  gender: KundliGender;
  orderDate: string;
  signature?: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  district: string;
  state: string;
  country: string;
  selectedServices: IKundliServiceItem[];
  preferredLanguage: KundliLanguage;
  mobileNumber: string;
  email: string;
  address?: string;
  totalAmount: number;
  paymentMethod: KundliPaymentMethod;
  paymentStatus: KundliPaymentStatus;
  paymentReference: string;
  orderStatus: KundliOrderStatus;
  estimatedDeliveryTime: string;
  reportFileName?: string;
  reportFileUrl?: string;
  adminNotes?: string;
  isDeleted: boolean;
}

const kundliServiceSchema = new Schema<IKundliServiceItem>(
  {
    title: { type: String, required: true, trim: true },
    pages: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const kundliRequestSchema = new Schema<IKundliRequest>(
  {
    orderId: { type: String, required: true, unique: true, trim: true },
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true, minlength: 3 },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    orderDate: { type: String, required: true, trim: true },
    signature: { type: String, trim: true },
    dateOfBirth: { type: String, required: true, trim: true },
    timeOfBirth: { type: String, required: true, trim: true },
    placeOfBirth: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    selectedServices: { type: [kundliServiceSchema], required: true, validate: [(value: IKundliServiceItem[]) => value.length > 0, "Select at least one service"] },
    preferredLanguage: { type: String, enum: ["English", "Hindi", "Marathi", "Gujarati"], required: true },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[0-9()\-\s]{7,18}$/, "Invalid phone number"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    address: { type: String, trim: true, maxlength: 400 },
    totalAmount: { type: Number, required: true, min: 1 },
    paymentMethod: { type: String, enum: ["UPI", "Razorpay", "Stripe"], required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Paid" },
    paymentReference: { type: String, required: true, trim: true },
    orderStatus: { type: String, enum: ["Pending", "Processing", "Completed"], default: "Pending" },
    estimatedDeliveryTime: { type: String, required: true, default: "3-5 working days" },
    reportFileName: { type: String, trim: true },
    reportFileUrl: { type: String, trim: true },
    adminNotes: { type: String, trim: true, maxlength: 1500 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model<IKundliRequest>("KundliRequest", kundliRequestSchema);
