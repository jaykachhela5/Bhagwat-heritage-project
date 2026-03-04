import type { Request, Response } from "express";
import Volunteer from "../models/Volunteer";
import { asyncHandler } from "../utils/asyncHandler";
import { volunteerCreateSchema, volunteerStatusSchema } from "../schemas/volunteer.schemas";

export const createVolunteer = asyncHandler(async (req: Request, res: Response) => {
  const data = volunteerCreateSchema.parse(req.body);
  const volunteer = new Volunteer(data);
  await volunteer.save();
  res.status(201).json({ message: "Volunteer application submitted", volunteer });
});

export const getAllVolunteers = asyncHandler(async (_req: Request, res: Response) => {
  const volunteers = await Volunteer.find({ isDeleted: false }).sort({ createdAt: -1 });
  res.json(volunteers);
});

export const getVolunteerById = asyncHandler(async (req: Request, res: Response) => {
  const volunteer = await Volunteer.findById(req.params.id);
  if (!volunteer || volunteer.isDeleted) {
    res.status(404).json({ message: "Volunteer not found" });
    return;
  }
  res.json(volunteer);
});

export const updateVolunteerStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status, adminNotes } = volunteerStatusSchema.parse(req.body);
  const volunteer = await Volunteer.findByIdAndUpdate(
    req.params.id,
    { status, adminNotes },
    { new: true }
  );
  if (!volunteer) {
    res.status(404).json({ message: "Volunteer not found" });
    return;
  }
  res.json({ message: "Status updated", volunteer });
});

export const deleteVolunteer = asyncHandler(async (req: Request, res: Response) => {
  await Volunteer.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "Volunteer deleted" });
});
