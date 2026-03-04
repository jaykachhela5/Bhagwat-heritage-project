import { z } from "zod";

export const donationSchema = z.object({
  amount: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email(),
});
