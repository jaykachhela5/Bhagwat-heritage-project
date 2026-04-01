import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const memberStatusSchema = z.object({
  status: z.enum(["Pending", "Approved", "Rejected"]),
});
