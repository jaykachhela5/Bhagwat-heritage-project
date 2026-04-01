import mongoose, { Document, Schema } from "mongoose";

export interface ILibraryDonation extends Document {
  donorName: string;
  bookDetails: string;
  quantity: number;
  createdAt: Date;
}

const libraryDonationSchema = new Schema<ILibraryDonation>({
  donorName: { type: String, required: true },
  bookDetails: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILibraryDonation>("LibraryDonation", libraryDonationSchema);
