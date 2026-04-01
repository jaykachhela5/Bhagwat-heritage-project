import type { Request, Response } from "express";
import LibraryDonation from "../models/LibraryDonation";
import { asyncHandler } from "../utils/asyncHandler";
import { libraryDonationSchema } from "../schemas/libraryDonation.schemas";

export const createLibraryDonation = asyncHandler(async (req: Request, res: Response) => {
  const payload = libraryDonationSchema.parse(req.body);
  const donation = await LibraryDonation.create(payload);
  res.status(201).json({ message: "Library donation recorded", donation });
});

export const getLibraryDonations = asyncHandler(async (_req: Request, res: Response) => {
  const donations = await LibraryDonation.find().sort({ createdAt: -1 });
  res.json(donations);
});
