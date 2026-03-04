import type { Request, Response } from "express";
import Join from "../models/Join";
import { sendMail } from "../utils/sendMail";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";
import { joinSchema } from "../schemas/involved.schemas";

export const joinInvolved = asyncHandler(async (req: Request, res: Response) => {
  const data = joinSchema.parse(req.body);
  const entry = new Join(data);
  await entry.save();

  try {
    await sendMail({ name: data.name, email: data.email, phone: data.phone, interest: data.interest, message: data.message });
  } catch (err) {
    logger.warn({ err }, "Failed to send join confirmation email");
  }

  res.json({ success: true, message: "Application Saved" });
});

export const getInvolved = asyncHandler(async (_req: Request, res: Response) => {
  const data = await Join.find().sort({ createdAt: -1 });
  res.json(data);
});

export const deleteInvolved = asyncHandler(async (req: Request, res: Response) => {
  await Join.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});
