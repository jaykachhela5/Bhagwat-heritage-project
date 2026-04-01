import type { Request, Response } from "express";
import LibraryRequest from "../models/LibraryRequest";
import { asyncHandler } from "../utils/asyncHandler";
import { libraryRequestSchema, libraryRequestStatusSchema } from "../schemas/libraryRequest.schemas";

export const createLibraryRequest = asyncHandler(async (req: Request, res: Response) => {
  const payload = libraryRequestSchema.parse(req.body);
  const request = await LibraryRequest.create(payload);
  res.status(201).json({ message: "Library request created", request });
});

export const getLibraryRequests = asyncHandler(async (_req: Request, res: Response) => {
  const requests = await LibraryRequest.find().sort({ createdAt: -1 });
  res.json(requests);
});

export const updateLibraryRequestStatus = asyncHandler(async (req: Request, res: Response) => {
  const payload = libraryRequestStatusSchema.parse(req.body);
  const request = await LibraryRequest.findByIdAndUpdate(req.params.id, payload, { new: true });

  if (!request) {
    res.status(404).json({ message: "Library request not found" });
    return;
  }

  res.json({ message: "Library request updated", request });
});
