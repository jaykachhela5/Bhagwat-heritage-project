import { z } from "zod";

export const issueSchema = z.object({
  bookId: z.string().min(1),
  studentName: z.string().min(1),
  phone: z.string().optional(),
  returnDate: z.string().optional(),
});

export const issueUpdateSchema = z
  .object({
    returnDate: z.string().optional(),
    status: z.enum(["Issued", "Returned"]).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "At least one field is required" });
