import { z } from "zod";

export const libraryRequestSchema = z.object({
  name: z.string().min(1),
  mobile: z.string().min(1),
  bookTitle: z.string().min(1),
  reason: z.string().optional(),
});

export const libraryRequestStatusSchema = z.object({
  status: z.enum(["Pending", "Approved", "Rejected"]),
});
