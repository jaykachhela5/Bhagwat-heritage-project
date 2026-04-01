import type { Request, Response } from "express";
import LibraryStats from "../models/LibraryStats";
import { asyncHandler } from "../utils/asyncHandler";
import { libraryStatsSchema } from "../schemas/libraryStats.schemas";

const defaultStats = {
  totalBooks: 0,
  totalUsers: 0,
  studentsBenefited: 0,
  activeMembers: 0,
};

export const getLibraryStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await LibraryStats.findOne().sort({ updatedAt: -1 });
  res.json(stats ?? defaultStats);
});

export const updateLibraryStats = asyncHandler(async (req: Request, res: Response) => {
  const payload = libraryStatsSchema.parse(req.body);
  const stats = await LibraryStats.findOneAndUpdate(
    {},
    { ...payload, updatedAt: new Date() },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.json({ message: "Library stats updated", stats });
});
