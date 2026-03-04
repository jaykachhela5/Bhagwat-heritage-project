import type { Request, Response } from "express";
import { z } from "zod";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import Event from "../models/Event";
import Registration from "../models/Registration";
import { asyncHandler } from "../utils/asyncHandler";

const registerSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
});

export const getEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await Event.find().sort({ date: -1 });
  res.json(events);
});

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "Image is required" });
    return;
  }

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "events" },
        (error, uploaded) => {
          if (error || !uploaded) return reject(error ?? new Error("Upload failed"));
          resolve(uploaded);
        }
      );
      streamifier.createReadStream(req.file!.buffer).pipe(stream);
    }
  );

  const event = await Event.create({
    title: req.body.title,
    peopleServed: req.body.peopleServed ? Number(req.body.peopleServed) : 0,
    image: result.secure_url,
  });

  res.json(event);
});

export const registerEvent = asyncHandler(async (req: Request, res: Response) => {
  const { eventId, name, email } = registerSchema.parse(req.body);
  const registration = new Registration({ eventId, name, email });
  await registration.save();
  await Event.findByIdAndUpdate(eventId, { $inc: { registrations: 1 } });
  res.json({ message: "Registered Successfully" });
});
