import type { Request, Response } from "express";
import Pathshala from "../models/Pathshala";
import { asyncHandler } from "../utils/asyncHandler";
import { admissionSchema } from "../schemas/pathshala.schemas";

export const submitAdmission = asyncHandler(async (req: Request, res: Response) => {
  const data = admissionSchema.parse(req.body);
  const student = new Pathshala(data);
  await student.save();
  res.status(201).json({ message: "Admission Submitted Successfully" });
});

export const getStudents = asyncHandler(async (_req: Request, res: Response) => {
  const students = await Pathshala.find().sort({ date: -1 });
  res.json(students);
});
