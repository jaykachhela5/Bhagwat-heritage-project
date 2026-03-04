import type { Request, Response } from "express";
import Cultural from "../models/Cultural";
import { asyncHandler } from "../utils/asyncHandler";

export const getCultural = asyncHandler(async (_req: Request, res: Response) => {
  const data = await Cultural.find();
  res.json(data);
});

export const createCultural = asyncHandler(async (req: Request, res: Response) => {
  const entry = new Cultural(req.body);
  await entry.save();
  res.json(entry);
});
