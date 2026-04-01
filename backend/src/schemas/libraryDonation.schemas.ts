import { z } from "zod";

export const libraryDonationSchema = z.object({
  donorName: z.string().min(1),
  bookDetails: z.string().min(1),
  quantity: z.number().int().positive(),
});
