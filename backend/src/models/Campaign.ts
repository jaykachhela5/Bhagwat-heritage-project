import mongoose, { Document, Schema } from "mongoose";

export type CampaignCategory = "Annadaan" | "Jal Seva" | "Both";

export interface ICampaign extends Document {
  title: string;
  description: string;
  category: CampaignCategory;
  goalAmount: number;
  collectedAmount: number;
  impactLine: string;
  coverImage?: string;
  location?: string;
  donorCount: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Annadaan", "Jal Seva", "Both"],
      default: "Both",
    },
    goalAmount: { type: Number, required: true, min: 1 },
    collectedAmount: { type: Number, default: 0, min: 0 },
    impactLine: { type: String, required: true, trim: true },
    coverImage: { type: String, trim: true },
    location: { type: String, trim: true },
    donorCount: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true },
);

campaignSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.model<ICampaign>("Campaign", campaignSchema);
