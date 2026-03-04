import type { Request, Response } from "express";
import Donation from "../models/Donation";
import { asyncHandler } from "../utils/asyncHandler";
import { donationSchema } from "../schemas/donation.schemas";

export const createDonation = asyncHandler(async (req: Request, res: Response) => {
  const data = donationSchema.parse(req.body);
  const donation = new Donation(data);
  await donation.save();
  res.json({ message: "Donation Saved", donation });
});

export const getDonations = asyncHandler(async (_req: Request, res: Response) => {
  const donations = await Donation.find().sort({ createdAt: -1 });
  res.json(donations);
});
