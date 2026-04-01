import mongoose, { Document, Schema } from "mongoose";

export type VolunteerStatus = "Pending" | "Approved" | "Rejected";
export type VolunteerInterest = "Annadaan" | "Jal Seva" | "Both";
export type VolunteerTrack = "Volunteer" | "Organizer" | "City Lead" | "Both";

export interface IVolunteer extends Document {
  fullName: string;
  email?: string;
  phone?: string;
  sevaArea?: string;
  skills?: string;
  message?: string;
  location?: string;
  availability?: string;
  interest?: VolunteerInterest;
  organizerTrack?: VolunteerTrack;
  status: VolunteerStatus;
  adminNotes?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const volunteerSchema = new Schema<IVolunteer>(
  {
    fullName: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      sparse: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
    },
    sevaArea: { type: String, trim: true },
    skills: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 500 },
    location: { type: String, trim: true },
    availability: { type: String, trim: true },
    interest: {
      type: String,
      enum: ["Annadaan", "Jal Seva", "Both"],
    },
    organizerTrack: {
      type: String,
      enum: ["Volunteer", "Organizer", "City Lead", "Both"],
      default: "Volunteer",
    },
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
