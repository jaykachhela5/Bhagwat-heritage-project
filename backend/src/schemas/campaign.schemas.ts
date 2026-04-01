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

export const campaignCreateSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(12).max(1200),
  category: z.enum(["Annadaan", "Jal Seva", "Both"]).default("Both"),
  goalAmount: z.coerce.number().positive().max(50000000),
  collectedAmount: z.coerce.number().min(0).max(50000000).default(0),
  impactLine: z.string().trim().min(4).max(220),
  coverImage: optionalTrimmed(600),
  location: optionalTrimmed(160),
  donorCount: z.coerce.number().int().min(0).default(0),
  isActive: optionalBoolean.transform((value) => value ?? true),
  startDate: optionalTrimmed(80),
  endDate: optionalTrimmed(80),
});

export const campaignUpdateSchema = campaignCreateSchema.partial();
