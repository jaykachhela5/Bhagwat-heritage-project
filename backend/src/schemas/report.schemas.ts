import { z } from "zod";

const optionalTrimmed = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(""), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined));

const optionalBoolean = z
  .union([z.boolean(), z.string(), z.undefined()])
  .transform((value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value === "true";
    return undefined;
  });

export const reportExpenseItemSchema = z.object({
  label: z.string().trim().min(1).max(160),
  amount: z.coerce.number().min(0).max(50000000),
  note: optionalTrimmed(220),
});

export const reportCreateSchema = z.object({
  title: z.string().trim().min(3).max(160),
  monthLabel: z.string().trim().min(3).max(120),
  summary: z.string().trim().min(10).max(2000),
  highlights: z.array(z.string().trim().min(1).max(180)).max(10).default([]),
  expenseBreakdown: z.array(reportExpenseItemSchema).min(1),
  videoUrl: optionalTrimmed(600),
  isPublished: optionalBoolean.transform((value) => value ?? true),
});

export const reportUpdateSchema = reportCreateSchema.partial();
