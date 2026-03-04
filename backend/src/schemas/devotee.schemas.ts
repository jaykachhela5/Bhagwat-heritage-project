import { z } from "zod";

export const devoteeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  city: z.string().optional(),
  message: z.string().optional(),
});
