import { z } from "zod";

export const joinSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  age: z.number().int().positive().optional(),
  interest: z.string().optional(),
  helpType: z.string().optional(),
  message: z.string().optional(),
});
