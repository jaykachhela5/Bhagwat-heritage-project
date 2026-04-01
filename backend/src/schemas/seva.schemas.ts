import { z } from "zod";
import { SEVA_SERVICE_TYPES } from "../models/SevaRequest";

const optionalCoordinate = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? undefined : value),
  z.coerce.number().optional(),
);

export const sevaLocationSchema = z.object({
  lat: optionalCoordinate.refine((value) => value === undefined || (value >= -90 && value <= 90), {
    message: "Latitude must be between -90 and 90",
  }),
  lng: optionalCoordinate.refine((value) => value === undefined || (value >= -180 && value <= 180), {
    message: "Longitude must be between -180 and 180",
  }),
  address: z.string().trim().min(5).max(300),
});

export const sevaCreateSchema = z.object({
  name: z.string().trim().min(3).max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  location: sevaLocationSchema,
  serviceType: z.enum(SEVA_SERVICE_TYPES),
  peopleCount: z.coerce.number().int().min(1).max(100000),
  urgency: z.enum(["Low", "Medium", "Emergency"]),
  description: z.string().trim().min(10).max(2000),
});

export const sevaAdminUpdateSchema = z
  .object({
    status: z.enum(["Pending", "Approved", "Rejected", "In Progress", "Completed"]).optional(),
    priorityLevel: z.enum(["Low", "Medium", "High", "Emergency"]).optional(),
    amountRequired: z.coerce.number().min(1).max(10000000).optional(),
    adminNotes: z.string().trim().max(1200).optional(),
  })
  .refine(
    (value) => Object.values(value).some((field) => field !== undefined),
    { message: "At least one field must be updated" },
  );

export const sevaCompletionSchema = z.object({
  completionReport: z.string().trim().max(3000).optional(),
});

export const sevaSponsorshipOrderSchema = z
  .object({
    donorName: z.string().trim().min(2).max(120),
    donorEmail: z.string().trim().email(),
    donorPhone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
      .optional()
      .or(z.literal("")),
    donationType: z.enum(["Full Sponsorship", "Custom Donation"]),
    customAmount: z.coerce.number().min(1).max(10000000).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.donationType === "Custom Donation" && value.customAmount === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Custom donation amount is required",
        path: ["customAmount"],
      });
    }
  });

export const sevaSponsorshipVerifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});
