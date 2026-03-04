import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  category: z.string().optional(),
  isbn: z.string().optional(),
  quantity: z.number().int().nonnegative().optional(),
  available: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
});
