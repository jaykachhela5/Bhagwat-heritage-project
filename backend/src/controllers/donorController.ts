import type { Request, Response } from "express";
import Donor from "../models/Donor";
import { asyncHandler } from "../utils/asyncHandler";
import { donorSchema } from "../schemas/donor.schemas";

export const createDonor = asyncHandler(async (req: Request, res: Response) => {
  const data = donorSchema.parse(req.body);
  const donor = new Donor(data);
  await donor.save();
  res.json({ message: "Donation Saved Successfully" });
});
