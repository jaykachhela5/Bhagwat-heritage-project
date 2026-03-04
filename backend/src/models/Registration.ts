import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRegistration extends Document {
  eventId: Types.ObjectId;
  name: string;
  email: string;
}

const registrationSchema = new Schema<IRegistration>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRegistration>("Registration", registrationSchema);
