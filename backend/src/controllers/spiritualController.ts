import type { Request, Response } from "express";
import Spiritual from "../models/Spiritual";
import { asyncHandler } from "../utils/asyncHandler";

export const getSpiritual = asyncHandler(async (_req: Request, res: Response) => {
  const data = await Spiritual.find();
  res.json(data);
});

export const createSpiritual = asyncHandler(async (req: Request, res: Response) => {
  const entry = new Spiritual(req.body);
  await entry.save();
  res.json(entry);
});
