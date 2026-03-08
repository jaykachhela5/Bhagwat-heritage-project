import { z } from "zod";

const kundliServiceItemSchema = z.object({
  title: z.string().trim().min(1),
  pages: z.number().int().positive(),
  price: z.number().positive(),
});

const selectedServicesSchema = z.preprocess((value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  return value;
}, z.array(kundliServiceItemSchema).min(1, "Select at least one Kundli service"));

export const kundliCreateSchema = z.object({
  fullName: z.string().trim().min(3),
  gender: z.enum(["Male", "Female"]),
  orderDate: z.string().trim().min(1),
  signature: z.string().trim().max(120).optional().or(z.literal("")),
  dateOfBirth: z.string().trim().min(1),
  timeOfBirth: z.string().trim().min(1),
  placeOfBirth: z.string().trim().min(2),
  district: z.string().trim().min(2),
  state: z.string().trim().min(2),
  country: z.string().trim().min(2),
  selectedServices: selectedServicesSchema,
  preferredLanguage: z.enum(["English", "Hindi", "Marathi", "Gujarati"]),
  mobileNumber: z.string().trim().regex(/^\+?[0-9()\-\s]{7,18}$/, "Invalid phone number"),
  email: z.string().email(),
  address: z.string().trim().max(400).optional().or(z.literal("")),
  totalAmount: z.preprocess((value) => Number(value), z.number().positive()),
  paymentMethod: z.enum(["UPI", "Razorpay", "Stripe"]),
  paymentStatus: z.enum(["Pending", "Paid", "Failed"]).default("Paid"),
  paymentReference: z.string().trim().min(4),
});

export const kundliStatusSchema = z.object({
  orderStatus: z.enum(["Pending", "Processing", "Completed"]),
  adminNotes: z.string().trim().max(1500).optional(),
  estimatedDeliveryTime: z.string().trim().min(3).max(100).optional(),
});
