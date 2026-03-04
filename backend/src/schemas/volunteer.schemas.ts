import { z } from "zod";

export const volunteerCreateSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  sevaArea: z.string().min(1),
  skills: z.string().optional(),
  message: z.string().max(500).optional(),
});

export const volunteerStatusSchema = z.object({
  status: z.enum(["Pending", "Approved", "Rejected"]),
  adminNotes: z.string().optional(),
});
