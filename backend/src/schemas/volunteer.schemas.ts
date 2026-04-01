import { z } from "zod";

const optionalTrimmed = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(""), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined));

export const volunteerCreateSchema = z
  .object({
    fullName: z.string().trim().min(3),
    email: z.union([z.string().trim().email(), z.literal(""), z.undefined()]).transform((value) => value || undefined),
    phone: z
      .union([z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"), z.literal(""), z.undefined()])
      .transform((value) => value || undefined),
    sevaArea: optionalTrimmed(120),
    skills: optionalTrimmed(240),
    message: optionalTrimmed(500),
    location: optionalTrimmed(160),
    availability: optionalTrimmed(120),
    interest: z.union([z.enum(["Annadaan", "Jal Seva", "Both"]), z.literal(""), z.undefined()]).transform((value) => value || undefined),
    organizerTrack: z
      .union([z.enum(["Volunteer", "Organizer", "City Lead", "Both"]), z.literal(""), z.undefined()])
      .transform((value) => value || undefined),
  })
  .refine((value) => Boolean(value.sevaArea || value.interest), {
    message: "Seva interest is required",
    path: ["interest"],
  });

export const volunteerStatusSchema = z.object({
  status: z.enum(["Pending", "Approved", "Rejected"]),
  adminNotes: z.union([z.string(), z.undefined()]).optional(),
});
