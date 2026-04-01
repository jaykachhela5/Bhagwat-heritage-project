import type { Request, Response } from "express";
import Volunteer from "../models/Volunteer";
import { asyncHandler } from "../utils/asyncHandler";
import { volunteerCreateSchema, volunteerStatusSchema } from "../schemas/volunteer.schemas";
import { buildCsv } from "../utils/csv";

export const createVolunteer = asyncHandler(async (req: Request, res: Response) => {
  const data = volunteerCreateSchema.parse(req.body);

  if (data.email) {
    const existingVolunteer = await Volunteer.findOne({
      email: data.email,
      isDeleted: false,
    });

    if (existingVolunteer) {
      res.status(409).json({ message: "Volunteer with this email already exists" });
      return;
    }
  }

  const volunteer = await Volunteer.create({
    ...data,
    sevaArea: data.sevaArea ?? data.interest ?? "General Seva",
    organizerTrack: data.organizerTrack ?? "Volunteer",
  });

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

export const getVolunteerAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const [summary] = await Volunteer.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        approved: {
          $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
        },
        organizers: {
          $sum: {
            $cond: [
              { $in: ["$organizerTrack", ["Organizer", "City Lead", "Both"]] },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  const byInterest = await Volunteer.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$interest",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    total: summary?.total ?? 0,
    approved: summary?.approved ?? 0,
    pending: summary?.pending ?? 0,
    organizers: summary?.organizers ?? 0,
    byInterest,
  });
});

export const exportVolunteersCsv = asyncHandler(async (_req: Request, res: Response) => {
  const volunteers = await Volunteer.find({ isDeleted: false }).sort({ createdAt: -1 });

  const csv = buildCsv(
    [
      "Name",
      "Email",
      "Phone",
      "Location",
      "Availability",
      "Interest",
      "Track",
      "Seva Area",
      "Status",
      "Created At",
    ],
    volunteers.map((volunteer) => [
      volunteer.fullName,
      volunteer.email ?? "",
      volunteer.phone ?? "",
      volunteer.location ?? "",
      volunteer.availability ?? "",
      volunteer.interest ?? "",
      volunteer.organizerTrack ?? "",
      volunteer.sevaArea ?? "",
      volunteer.status,
      volunteer.createdAt,
    ]),
  );

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=volunteers.csv");
  res.send(csv);
});
