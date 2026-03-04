import type { Request, Response } from "express";
import Devotee from "../models/Devotee";
import { asyncHandler } from "../utils/asyncHandler";
import { devoteeSchema } from "../schemas/devotee.schemas";

export const createDevotee = asyncHandler(async (req: Request, res: Response) => {
  const data = devoteeSchema.parse(req.body);
  const devotee = new Devotee(data);
  await devotee.save();
  res.json({ message: "Form submitted successfully 🙏" });
});
