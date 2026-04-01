import type { Request, Response } from "express";
import Member from "../models/Member";
import { asyncHandler } from "../utils/asyncHandler";
import { memberSchema, memberStatusSchema } from "../schemas/member.schemas";

export const addMember = asyncHandler(async (req: Request, res: Response) => {
  const data = memberSchema.parse(req.body);
  const member = new Member({
    ...data,
    email: data.email || undefined,
  });
  await member.save();
  res.json({ message: "Member Added", member });
});

export const getMembers = asyncHandler(async (_req: Request, res: Response) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json(members);
});

export const updateMemberStatus = asyncHandler(async (req: Request, res: Response) => {
  const payload = memberStatusSchema.parse(req.body);
  const member = await Member.findByIdAndUpdate(req.params.id, payload, { new: true });

  if (!member) {
    res.status(404).json({ message: "Member not found" });
    return;
  }

  res.json({ message: "Member status updated", member });
});
