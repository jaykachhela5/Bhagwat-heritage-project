import { createHmac, timingSafeEqual } from "crypto";
import type { Request, Response } from "express";
import Campaign from "../models/Campaign";
import Donation from "../models/Donation";
import { env } from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";
import { buildCsv } from "../utils/csv";
import { logger } from "../utils/logger";
import {
  donationOrderSchema,
  donationSchema,
  donationSubscriptionSchema,
  donationVerifySchema,
} from "../schemas/donation.schemas";

export const createDonation = asyncHandler(async (req: Request, res: Response) => {
  const data = donationSchema.parse(req.body);

  const donation = await Donation.create({
    ...data,
    paymentFlow: "Manual",
    paymentStatus: "Pending",
    status: "Pending",
  });

  res.status(201).json({ message: "Donation saved", donation });
});

export const getDonations = asyncHandler(async (_req: Request, res: Response) => {
  const donations = await Donation.find().sort({ createdAt: -1 });
  res.json(donations);
});

function verifySignature(base: string, signature: string) {
  if (!env.RAZORPAY_KEY_SECRET) {
    return false;
  }

  const digest = createHmac("sha256", env.RAZORPAY_KEY_SECRET).update(base).digest("hex");
  const expected = Buffer.from(digest);
  const received = Buffer.from(signature);

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

async function createRazorpayOrder(amount: number, notes: Record<string, string>) {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  const credentials = Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const receipt = `don_${Date.now()}`;

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt,
      notes,
    }),
  });

  if (!response.ok) {
    logger.error({ amount, notes, message: await response.text() }, "Unable to create Razorpay donation order");
    throw new Error("Unable to create donation order");
  }

  return response.json() as Promise<{ id: string; currency: string; receipt: string }>;
}

async function createRazorpaySubscription(planId: string, notes: Record<string, string>) {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  const credentials = Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      total_count: 120,
      quantity: 1,
      customer_notify: 1,
      notes,
    }),
  });

  if (!response.ok) {
    logger.error({ planId, notes, message: await response.text() }, "Unable to create Razorpay subscription");
    throw new Error("Unable to create monthly donation subscription");
  }

  return response.json() as Promise<{ id: string; plan_id: string; status: string }>;
}

function resolveSubscriptionPlanId(amount: number) {
  if (amount === 151) return env.RAZORPAY_PLAN_151;
  if (amount === 501) return env.RAZORPAY_PLAN_501;
  if (amount === 1100) return env.RAZORPAY_PLAN_1100;
  return undefined;
}

export const createDonationOrder = asyncHandler(async (req: Request, res: Response) => {
  const payload = donationOrderSchema.parse(req.body);

  try {
    const order = await createRazorpayOrder(payload.amount, {
      donationType: payload.donationType,
      donorName: payload.name,
      donorEmail: payload.email,
      donorMobile: payload.mobile,
      campaignId: payload.campaignId ?? "",
      campaignTitle: payload.campaignTitle ?? "",
      sponsorLabel: payload.sponsorLabel ?? "",
    });

    res.status(201).json({
      message: "Donation order created",
      keyId: env.RAZORPAY_KEY_ID,
      orderId: order.id,
      currency: order.currency,
      amount: payload.amount,
      receiptId: order.receipt,
    });
  } catch (error) {
    res.status(502).json({
      message:
        error instanceof Error && error.message === "Razorpay credentials are not configured"
          ? "Razorpay is not configured on the server"
          : "Unable to create donation order",
    });
  }
});

export const createDonationSubscription = asyncHandler(async (req: Request, res: Response) => {
  const payload = donationSubscriptionSchema.parse(req.body);
  const planId = resolveSubscriptionPlanId(payload.recurringPlan);

  if (!planId) {
    res.status(503).json({
      message: "Recurring donation plan is not configured on the server",
    });
    return;
  }

  try {
    const subscription = await createRazorpaySubscription(planId, {
      donationType: payload.donationType,
      donorName: payload.name,
      donorEmail: payload.email,
      donorMobile: payload.mobile,
      recurringPlan: String(payload.recurringPlan),
      campaignId: payload.campaignId ?? "",
      campaignTitle: payload.campaignTitle ?? "",
      sponsorLabel: payload.sponsorLabel ?? "",
    });

    res.status(201).json({
      message: "Recurring donation subscription created",
      keyId: env.RAZORPAY_KEY_ID,
      subscriptionId: subscription.id,
      amount: payload.recurringPlan,
      status: subscription.status,
    });
  } catch (error) {
    res.status(502).json({
      message:
        error instanceof Error && error.message === "Razorpay credentials are not configured"
          ? "Razorpay is not configured on the server"
          : "Unable to create monthly donation subscription",
    });
  }
});

export const verifyDonationPayment = asyncHandler(async (req: Request, res: Response) => {
  const payload = donationVerifySchema.parse(req.body);
  const existingDonation = await Donation.findOne({ razorpayPaymentId: payload.razorpay_payment_id });

  if (existingDonation) {
    res.json({ message: "Payment already verified", donation: existingDonation });
    return;
  }

  const isValid =
    payload.flow === "order"
      ? verifySignature(`${payload.razorpay_order_id}|${payload.razorpay_payment_id}`, payload.razorpay_signature)
      : verifySignature(`${payload.razorpay_payment_id}|${payload.razorpay_subscription_id}`, payload.razorpay_signature);

  if (!isValid) {
    res.status(400).json({ message: "Invalid payment signature" });
    return;
  }

  const donation = await Donation.create({
    ...payload.donation,
    paymentFlow: payload.flow === "order" ? "Order" : "Subscription",
    paymentStatus: "Paid",
    status: "Completed",
    razorpayOrderId: payload.razorpay_order_id,
    razorpayPaymentId: payload.razorpay_payment_id,
    razorpaySignature: payload.razorpay_signature,
    razorpaySubscriptionId: payload.razorpay_subscription_id,
  });

  if (payload.donation.campaignId) {
    await Campaign.findByIdAndUpdate(payload.donation.campaignId, {
      $inc: {
        collectedAmount: payload.donation.amount,
        donorCount: 1,
      },
    });
  }

  res.status(201).json({ message: "Donation payment verified", donation });
});

export const getDonationAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const [summary] = await Donation.aggregate([
    {
      $group: {
        _id: null,
        totalRaised: {
          $sum: {
            $cond: [{ $eq: ["$paymentStatus", "Paid"] }, "$amount", 0],
          },
        },
        totalDonations: { $sum: 1 },
        completedDonations: {
          $sum: {
            $cond: [{ $eq: ["$paymentStatus", "Paid"] }, 1, 0],
          },
        },
        monthlySupporters: {
          $sum: {
            $cond: [{ $eq: ["$donationMode", "Monthly"] }, 1, 0],
          },
        },
      },
    },
  ]);

  const byType = await Donation.aggregate([
    {
      $group: {
        _id: "$donationType",
        totalAmount: {
          $sum: {
            $cond: [{ $eq: ["$paymentStatus", "Paid"] }, "$amount", 0],
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    totalRaised: summary?.totalRaised ?? 0,
    totalDonations: summary?.totalDonations ?? 0,
    completedDonations: summary?.completedDonations ?? 0,
    monthlySupporters: summary?.monthlySupporters ?? 0,
    byType,
  });
});

export const exportDonationsCsv = asyncHandler(async (_req: Request, res: Response) => {
  const donations = await Donation.find().sort({ createdAt: -1 });

  const csv = buildCsv(
    [
      "Name",
      "Email",
      "Mobile",
      "Donation Type",
      "Mode",
      "Amount",
      "Occasion",
      "Campaign",
      "Sponsor Label",
      "Payment Status",
      "Status",
      "Created At",
    ],
    donations.map((donation) => [
      donation.name,
      donation.email,
      donation.mobile ?? "",
      donation.donationType,
      donation.donationMode,
      donation.amount,
      donation.occasion ?? "",
      donation.campaignTitle ?? "",
      donation.sponsorLabel ?? "",
      donation.paymentStatus,
      donation.status,
      donation.createdAt,
    ]),
  );

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=donations.csv");
  res.send(csv);
});
