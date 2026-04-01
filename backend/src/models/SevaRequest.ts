import mongoose, { Document, Schema } from "mongoose";

export const SEVA_SERVICE_TYPES = [
  "Gau Seva",
  "Jal Seva",
  "Ann Seva",
  "Medicine Distribution",
  "Education Support",
  "Scholarship Program",
  "Kanyadaan Seva",
  "Vyasanmukti Abhiyan",
  "Disaster Relief",
] as const;

export type SevaServiceType = (typeof SEVA_SERVICE_TYPES)[number];
export type SevaUrgency = "Low" | "Medium" | "Emergency";
export type SevaStatus = "Pending" | "Approved" | "Rejected" | "In Progress" | "Completed";
export type SevaPriority = "Low" | "Medium" | "High" | "Emergency";
export type SevaFundingStatus = "Unfunded" | "Partially Funded" | "Funded";
export type SevaDonationType = "Full Sponsorship" | "Custom Donation";

export interface ISevaLocation {
  lat?: number;
  lng?: number;
  address: string;
}

export interface ISevaSponsor {
  name: string;
  email: string;
  phone?: string;
  amount: number;
  donationType: SevaDonationType;
  paymentGateway: "Razorpay";
  paymentStatus: "Created" | "Paid" | "Failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
}

export interface ISevaRequest extends Document {
  name: string;
  phone: string;
  location: ISevaLocation;
  serviceType: SevaServiceType;
  peopleCount: number;
  urgency: SevaUrgency;
  description: string;
  image: string;
  imagePublicId?: string;
  status: SevaStatus;
  priorityLevel: SevaPriority;
  fundingStatus: SevaFundingStatus;
  amountRequired: number;
  amountCollected: number;
  sponsors: ISevaSponsor[];
  completionImages: string[];
  completionImagePublicIds: string[];
  completionReport?: string;
  adminNotes?: string;
  approvedAt?: Date;
  completedAt?: Date;
  lastSponsoredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sevaLocationSchema = new Schema<ISevaLocation>(
  {
    lat: { type: Number, min: -90, max: 90 },
    lng: { type: Number, min: -180, max: 180 },
    address: { type: String, required: true, trim: true, minlength: 5, maxlength: 300 },
  },
  { _id: false },
);

const sevaSponsorSchema = new Schema<ISevaSponsor>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
    },
    amount: { type: Number, required: true, min: 1 },
    donationType: {
      type: String,
      enum: ["Full Sponsorship", "Custom Donation"],
      required: true,
    },
    paymentGateway: {
      type: String,
      enum: ["Razorpay"],
      default: "Razorpay",
    },
    paymentStatus: {
      type: String,
      enum: ["Created", "Paid", "Failed"],
      default: "Created",
    },
    razorpayOrderId: { type: String, trim: true },
    razorpayPaymentId: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const sevaRequestSchema = new Schema<ISevaRequest>(
  {
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
    },
    location: { type: sevaLocationSchema, required: true },
    serviceType: {
      type: String,
      enum: [...SEVA_SERVICE_TYPES],
      required: true,
    },
    peopleCount: { type: Number, required: true, min: 1, max: 100000 },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "Emergency"],
      required: true,
    },
    description: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
    image: { type: String, required: true },
    imagePublicId: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "In Progress", "Completed"],
      default: "Pending",
    },
    priorityLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
      default: "Medium",
    },
    fundingStatus: {
      type: String,
      enum: ["Unfunded", "Partially Funded", "Funded"],
      default: "Unfunded",
    },
    amountRequired: { type: Number, required: true, min: 1 },
    amountCollected: { type: Number, default: 0, min: 0 },
    sponsors: { type: [sevaSponsorSchema], default: [] },
    completionImages: { type: [String], default: [] },
    completionImagePublicIds: { type: [String], default: [] },
    completionReport: { type: String, trim: true, maxlength: 3000 },
    adminNotes: { type: String, trim: true, maxlength: 1200 },
    approvedAt: { type: Date },
    completedAt: { type: Date },
    lastSponsoredAt: { type: Date },
  },
  { timestamps: true },
);

sevaRequestSchema.index({ status: 1, createdAt: -1 });
sevaRequestSchema.index({ serviceType: 1, priorityLevel: 1, createdAt: -1 });
sevaRequestSchema.index({ "location.lat": 1, "location.lng": 1 });

export default mongoose.model<ISevaRequest>("SevaRequest", sevaRequestSchema);
