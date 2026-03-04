import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  image: string;
  date: Date;
  peopleServed: number;
  description?: string;
  registrations: number;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    date: { type: Date, default: Date.now },
    peopleServed: { type: Number, default: 0 },
    description: { type: String },
    registrations: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", eventSchema);
