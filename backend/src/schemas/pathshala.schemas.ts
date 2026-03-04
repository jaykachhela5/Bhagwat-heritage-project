import { z } from "zod";

export const admissionSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive().optional(),
  parentName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  course: z.string().optional(),
  message: z.string().optional(),
});
