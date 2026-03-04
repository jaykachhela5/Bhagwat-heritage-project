import mongoose, { Document, Schema } from "mongoose";

export type VolunteerStatus = "Pending" | "Approved" | "Rejected";

export interface IVolunteer extends Document {
  fullName: string;
  email: string;
  phone: string;
  sevaArea: string;
  skills?: string;
  message?: string;
  status: VolunteerStatus;
  adminNotes?: string;
  isDeleted: boolean;
}

const volunteerSchema = new Schema<IVolunteer>(
  {
    fullName: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
    },
    sevaArea: { type: String, required: true, trim: true },
    skills: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminNotes: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IVolunteer>("Volunteer", volunteerSchema);
