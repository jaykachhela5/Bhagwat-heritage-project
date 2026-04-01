import { z } from "zod";

const indianPhoneSchema = z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number");

const optionalTrimmed = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(""), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined));

const donationBaseSchema = z.object({
  amount: z.coerce.number().positive().max(1000000),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  donationType: z.enum(["Annadaan", "Jal Seva", "Both"]).default("Both"),
  occasion: optionalTrimmed(120),
  message: optionalTrimmed(600),
  sponsorLabel: optionalTrimmed(160),
  campaignId: optionalTrimmed(80),
  campaignTitle: optionalTrimmed(160),
  donationMode: z.enum(["One-Time", "Monthly"]).default("One-Time"),
  recurringPlan: z.coerce.number().positive().optional(),
});

export const donationSchema = donationBaseSchema.extend({
  mobile: z.union([indianPhoneSchema, z.literal(""), z.undefined()]).transform((value) => value || undefined),
});

export const donationOrderSchema = donationBaseSchema.extend({
  mobile: indianPhoneSchema,
  donationMode: z.literal("One-Time").default("One-Time"),
});

export const donationSubscriptionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  mobile: indianPhoneSchema,
  donationType: z.enum(["Annadaan", "Jal Seva", "Both"]).default("Both"),
  occasion: optionalTrimmed(120),
  message: optionalTrimmed(600),
  sponsorLabel: optionalTrimmed(160),
  campaignId: optionalTrimmed(80),
  campaignTitle: optionalTrimmed(160),
  donationMode: z.literal("Monthly").default("Monthly"),
  recurringPlan: z.coerce.number().refine((value) => [151, 501, 1100].includes(value), "Invalid recurring plan"),
});

export const donationVerifySchema = z
  .object({
    flow: z.enum(["order", "subscription"]),
    donation: donationBaseSchema.extend({
      mobile: indianPhoneSchema,
    }),
    razorpay_order_id: z.string().trim().optional(),
    razorpay_payment_id: z.string().trim().min(1),
    razorpay_signature: z.string().trim().min(1),
    razorpay_subscription_id: z.string().trim().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.flow === "order" && !value.razorpay_order_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["razorpay_order_id"],
        message: "Razorpay order id is required",
      });
    }

    if (value.flow === "subscription" && !value.razorpay_subscription_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["razorpay_subscription_id"],
        message: "Razorpay subscription id is required",
      });
    }
  });
