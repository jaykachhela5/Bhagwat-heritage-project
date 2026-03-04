import { z } from "zod";

export const donorSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  amount: z.number().positive(),
  message: z.string().optional(),
});
