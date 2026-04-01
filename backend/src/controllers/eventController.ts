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

const DAY_MS = 24 * 60 * 60 * 1000;
const MAHOTSAV_EVENT_TITLE = /bhagwat katha mahotsav/i;
const MAHOTSAV_SESSION_TEMPLATES = [
  { slot: "Morning", title: "Mangalacharan and Bhajan", hour: 8, minute: 0, durationHours: 2 },
  { slot: "Afternoon", title: "Bhagwat Katha Main Session", hour: 15, minute: 0, durationHours: 3 },
  { slot: "Evening", title: "Aarti, Sankirtan, and Reflection", hour: 19, minute: 30, durationHours: 2 },
] as const;

type MahotsavSessionStatus = "live" | "next" | "upcoming" | "completed";

interface MahotsavLiveSession {
  id: string;
  dayLabel: string;
  slot: string;
  title: string;
  start: string;
  end: string;
  status: MahotsavSessionStatus;
}

function getCountdownParts(diffMs: number) {
  const safeDiff = Math.max(0, diffMs);
  const totalMinutes = Math.floor(safeDiff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes, totalMilliseconds: safeDiff };
}

function buildMahotsavSchedule(baseDate: Date, now: Date) {
  const anchor = new Date(baseDate);
  anchor.setHours(0, 0, 0, 0);

  const sessions = Array.from({ length: 7 }, (_, dayIndex) => {
    const dayLabel = `Day ${dayIndex + 1}`;

    return MAHOTSAV_SESSION_TEMPLATES.map((template) => {
      const start = new Date(anchor);
      start.setDate(anchor.getDate() + dayIndex);
      start.setHours(template.hour, template.minute, 0, 0);

      const end = new Date(start);
      end.setHours(end.getHours() + template.durationHours);

      return {
        id: `${dayLabel}-${template.slot}`,
        dayLabel,
        slot: template.slot,
        title: template.title,
        start,
        end,
      };
    });
  }).flat();

  const currentSession =
    sessions.find((session) => now >= session.start && now <= session.end) ?? null;
  const nextSession = sessions.find((session) => now < session.start) ?? null;

  const schedule: MahotsavLiveSession[] = sessions.map((session) => ({
    id: session.id,
    dayLabel: session.dayLabel,
    slot: session.slot,
    title: session.title,
    start: session.start.toISOString(),
    end: session.end.toISOString(),
    status:
      currentSession?.id === session.id
        ? "live"
        : nextSession?.id === session.id
          ? "next"
          : now < session.start
            ? "upcoming"
            : "completed",
  }));

  return {
    schedule,
    currentSession: schedule.find((session) => session.status === "live") ?? null,
    nextSession: schedule.find((session) => session.status === "next") ?? null,
    eventEnd: sessions[sessions.length - 1]?.end ?? anchor,
  };
}

export const getEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await Event.find().sort({ date: -1 });
  res.json(events);
});

export const getMahotsavLive = asyncHandler(async (_req: Request, res: Response) => {
  const now = new Date();
  const recentCutoff = new Date(now.getTime() - 7 * DAY_MS);

  const sourceEvent = await Event.findOne({
    title: { $regex: MAHOTSAV_EVENT_TITLE },
    date: { $gte: recentCutoff },
  }).sort({ date: 1 });

  const mahotsavStart = sourceEvent ? new Date(sourceEvent.date) : new Date(now.getTime() + 12 * DAY_MS);
  mahotsavStart.setHours(0, 0, 0, 0);

  const { schedule, currentSession, nextSession, eventEnd } = buildMahotsavSchedule(mahotsavStart, now);
  const countdownTarget = currentSession
    ? new Date(currentSession.end)
    : nextSession
      ? new Date(nextSession.start)
      : eventEnd;

  res.json({
    source: sourceEvent ? "event" : "fallback",
    eventId: sourceEvent?._id.toString(),
    eventTitle: sourceEvent?.title ?? "Bhagwat Katha Mahotsav",
    serverTime: now.toISOString(),
    mahotsavStart: mahotsavStart.toISOString(),
    eventEnd: eventEnd.toISOString(),
    currentSession,
    nextSession,
    countdown: getCountdownParts(countdownTarget.getTime() - now.getTime()),
    schedule,
  });
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
