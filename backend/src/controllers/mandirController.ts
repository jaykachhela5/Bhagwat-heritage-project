import type { Request, Response } from "express";
import MandirContent from "../models/MandirContent";
import { asyncHandler } from "../utils/asyncHandler";

export const getMandir = asyncHandler(async (_req: Request, res: Response) => {
  const data = await MandirContent.findOne();
  res.json(data);
});

export const updateMandir = asyncHandler(async (req: Request, res: Response) => {
  const updated = await MandirContent.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
  });
  res.json(updated);
});
