import type { Request, Response } from "express";
import Member from "../models/Member";
import { asyncHandler } from "../utils/asyncHandler";
import { memberSchema } from "../schemas/member.schemas";

export const addMember = asyncHandler(async (req: Request, res: Response) => {
  const data = memberSchema.parse(req.body);
  const member = new Member(data);
  await member.save();
  res.json({ message: "Member Added" });
});

export const getMembers = asyncHandler(async (_req: Request, res: Response) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json(members);
});
