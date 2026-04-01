import mongoose, { Document, Schema } from "mongoose";

export interface ILibraryStats extends Document {
  totalBooks: number;
  totalUsers: number;
  studentsBenefited: number;
  activeMembers: number;
  updatedAt: Date;
}

const libraryStatsSchema = new Schema<ILibraryStats>({
  totalBooks: { type: Number, default: 0 },
  totalUsers: { type: Number, default: 0 },
  studentsBenefited: { type: Number, default: 0 },
  activeMembers: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILibraryStats>("LibraryStats", libraryStatsSchema);
