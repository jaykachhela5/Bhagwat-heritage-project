import { z } from "zod";

export const issueSchema = z.object({
  bookId: z.string().min(1),
  studentName: z.string().min(1),
  phone: z.string().optional(),
  returnDate: z.string().optional(),
});
