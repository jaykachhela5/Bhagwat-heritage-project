import { createHmac, timingSafeEqual } from "crypto";
import type { Request, Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import { env } from "../config/env";
import SevaRequest, {
  type ISevaRequest,
  type SevaFundingStatus,
  type SevaPriority,
  type SevaServiceType,
  type SevaStatus,
  type SevaUrgency,
} from "../models/SevaRequest";
import {
  sevaAdminUpdateSchema,
  sevaCompletionSchema,
  sevaCreateSchema,
  sevaLocationSchema,
  sevaSponsorshipOrderSchema,
  sevaSponsorshipVerifySchema,
} from "../schemas/seva.schemas";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";
import { sendSevaRequestMail } from "../utils/sendSevaRequestMail";

const JAL_SEVA_FIXED_AMOUNT = 2500;
const GAU_SEVA_FIXED_AMOUNT = 3000;
const KANYADAAN_FIXED_AMOUNT = 51000;
const ANN_SEVA_RATE_PER_PERSON = 50;
const MEDICINE_RATE_PER_PERSON = 350;
const EDUCATION_RATE_PER_PERSON = 1200;
const SCHOLARSHIP_RATE_PER_PERSON = 5000;
const VYASANMUKTI_RATE_PER_PERSON = 3000;
const DISASTER_RELIEF_RATE_PER_PERSON = 1000;
const PUBLIC_STATUSES: SevaStatus[] = ["Approved", "In Progress", "Completed"];

function parseLocation(value: unknown) {
  if (typeof value === "string") {
    try {
      return sevaLocationSchema.parse(JSON.parse(value));
    } catch {
      throw Object.assign(new Error("Invalid location payload"), { statusCode: 400 });
    }
  }

  return sevaLocationSchema.parse(value);
}

function calculateAmountRequired(serviceType: SevaServiceType, peopleCount: number) {
  switch (serviceType) {
    case "Ann Seva":
      return peopleCount * ANN_SEVA_RATE_PER_PERSON;
    case "Medicine Distribution":
      return peopleCount * MEDICINE_RATE_PER_PERSON;
    case "Education Support":
      return peopleCount * EDUCATION_RATE_PER_PERSON;
    case "Scholarship Program":
      return peopleCount * SCHOLARSHIP_RATE_PER_PERSON;
    case "Vyasanmukti Abhiyan":
      return peopleCount * VYASANMUKTI_RATE_PER_PERSON;
    case "Disaster Relief":
      return peopleCount * DISASTER_RELIEF_RATE_PER_PERSON;
    case "Gau Seva":
      return GAU_SEVA_FIXED_AMOUNT;
    case "Kanyadaan Seva":
      return KANYADAAN_FIXED_AMOUNT;
    case "Jal Seva":
    default:
      return JAL_SEVA_FIXED_AMOUNT;
  }
}

function derivePriority(urgency: SevaUrgency, peopleCount: number): SevaPriority {
  if (urgency === "Emergency") return "Emergency";
  if (peopleCount >= 100) return "High";
  return urgency === "Medium" ? "Medium" : "Low";
}

function deriveFundingStatus(amountCollected: number, amountRequired: number): SevaFundingStatus {
  if (amountCollected >= amountRequired) return "Funded";
  if (amountCollected > 0) return "Partially Funded";
  return "Unfunded";
}

async function uploadSingleImage(file: Express.Multer.File, folder: string) {
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, uploaded) => {
        if (error || !uploaded) {
          reject(error ?? new Error("Upload failed"));
          return;
        }

        resolve(uploaded);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

async function uploadMultipleImages(files: Express.Multer.File[], folder: string) {
  return Promise.all(files.map((file) => uploadSingleImage(file, folder)));
}

function sortRequests(requests: ISevaRequest[]) {
  const priorityRank: Record<SevaPriority, number> = {
    Emergency: 4,
    High: 3,
    Medium: 2,
    Low: 1,
  };
  const statusRank: Record<SevaStatus, number> = {
    Pending: 5,
    Approved: 4,
    "In Progress": 3,
    Completed: 2,
    Rejected: 1,
  };

  return [...requests].sort((left, right) => {
    const priorityDiff = priorityRank[right.priorityLevel] - priorityRank[left.priorityLevel];
    if (priorityDiff !== 0) return priorityDiff;

    const statusDiff = statusRank[right.status] - statusRank[left.status];
    if (statusDiff !== 0) return statusDiff;

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

async function createRazorpayOrder(requestId: string, amount: number, notes: Record<string, string>) {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  const credentials = Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const receipt = `seva_${requestId.slice(-6)}_${Date.now()}`;

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
    const message = await response.text();
    logger.error({ requestId, amount, message }, "Failed to create Razorpay order");
    throw new Error("Unable to create sponsorship order");
  }

  return response.json() as Promise<{ id: string; amount: number; currency: string; receipt: string }>;
}

function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  if (!env.RAZORPAY_KEY_SECRET) {
    return false;
  }

  const digest = createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expected = Buffer.from(digest);
  const received = Buffer.from(signature);

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

export const createSevaRequest = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "Proof image is required" });
    return;
  }

  const location = parseLocation(req.body.location);
  const data = sevaCreateSchema.parse({
    ...req.body,
    location,
  });

  const uploadedImage = await uploadSingleImage(req.file, "seva/proof");
  const amountRequired = calculateAmountRequired(data.serviceType, data.peopleCount);
  const sevaRequest = await SevaRequest.create({
    ...data,
    image: uploadedImage.secure_url,
    imagePublicId: uploadedImage.public_id,
    status: "Pending",
    priorityLevel: derivePriority(data.urgency, data.peopleCount),
    amountRequired,
    amountCollected: 0,
    fundingStatus: "Unfunded",
  });

  sendSevaRequestMail({
    name: sevaRequest.name,
    phone: sevaRequest.phone,
    serviceType: sevaRequest.serviceType,
    peopleCount: sevaRequest.peopleCount,
    urgency: sevaRequest.urgency,
    address: sevaRequest.location.address,
    description: sevaRequest.description,
  }).catch((error) => logger.warn({ error }, "Unable to send seva alert email"));

  res.status(201).json({
    message: "Seva request submitted successfully",
    request: sevaRequest,
  });
});

export const getAdminSevaRequests = asyncHandler(async (_req: Request, res: Response) => {
  const requests = await SevaRequest.find().sort({ createdAt: -1 });
  res.json(sortRequests(requests));
});

export const getLiveSevaRequests = asyncHandler(async (_req: Request, res: Response) => {
  const requests = await SevaRequest.find({ status: { $in: PUBLIC_STATUSES } }).sort({ createdAt: -1 });
  res.json(sortRequests(requests));
});

export const updateSevaRequestAdmin = asyncHandler(async (req: Request, res: Response) => {
  const payload = sevaAdminUpdateSchema.parse(req.body);
  const sevaRequest = await SevaRequest.findById(req.params.id);

  if (!sevaRequest) {
    res.status(404).json({ message: "Seva request not found" });
    return;
  }

  if (payload.status) {
    sevaRequest.status = payload.status;

    if (payload.status === "Approved" && !sevaRequest.approvedAt) {
      sevaRequest.approvedAt = new Date();
    }

    if (payload.status === "Completed" && !sevaRequest.completedAt) {
      sevaRequest.completedAt = new Date();
    }
  }

  if (payload.priorityLevel) {
    sevaRequest.priorityLevel = payload.priorityLevel;
  }

  if (payload.amountRequired !== undefined) {
    sevaRequest.amountRequired = payload.amountRequired;
  }

  if (payload.adminNotes !== undefined) {
    sevaRequest.adminNotes = payload.adminNotes || undefined;
  }

  sevaRequest.fundingStatus = deriveFundingStatus(sevaRequest.amountCollected, sevaRequest.amountRequired);

  await sevaRequest.save();

  res.json({
    message: "Seva request updated successfully",
    request: sevaRequest,
  });
});

export const uploadCompletionProof = asyncHandler(async (req: Request, res: Response) => {
  const payload = sevaCompletionSchema.parse(req.body);
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const sevaRequest = await SevaRequest.findById(req.params.id);

  if (!sevaRequest) {
    res.status(404).json({ message: "Seva request not found" });
    return;
  }

  if (files.length === 0 && !payload.completionReport) {
    res.status(400).json({ message: "Add at least one completion image or a completion report" });
    return;
  }

  if (files.length > 0) {
    const uploadedImages = await uploadMultipleImages(files, "seva/completion");
    sevaRequest.completionImages.push(...uploadedImages.map((file) => file.secure_url));
    sevaRequest.completionImagePublicIds.push(...uploadedImages.map((file) => file.public_id));
  }

  if (payload.completionReport !== undefined) {
    sevaRequest.completionReport = payload.completionReport || undefined;
  }

  sevaRequest.status = "Completed";
  sevaRequest.completedAt = new Date();
  sevaRequest.fundingStatus = deriveFundingStatus(sevaRequest.amountCollected, sevaRequest.amountRequired);

  await sevaRequest.save();

  res.json({
    message: "Completion proof uploaded successfully",
    request: sevaRequest,
  });
});

export const createSevaSponsorshipOrder = asyncHandler(async (req: Request, res: Response) => {
  const payload = sevaSponsorshipOrderSchema.parse(req.body);
  const sevaRequest = await SevaRequest.findById(req.params.id);

  if (!sevaRequest) {
    res.status(404).json({ message: "Seva request not found" });
    return;
  }

  if (!PUBLIC_STATUSES.includes(sevaRequest.status) || sevaRequest.status === "Completed") {
    res.status(400).json({ message: "This seva request is not available for sponsorship" });
    return;
  }

  const remainingAmount = Math.max(sevaRequest.amountRequired - sevaRequest.amountCollected, 0);

  if (remainingAmount <= 0) {
    res.status(400).json({ message: "This seva request is already fully funded" });
    return;
  }

  const amount =
    payload.donationType === "Full Sponsorship"
      ? remainingAmount
      : Math.min(payload.customAmount ?? 0, remainingAmount);

  if (amount <= 0) {
    res.status(400).json({ message: "Donation amount must be greater than zero" });
    return;
  }

  try {
    const order = await createRazorpayOrder(sevaRequest.id, amount, {
      requestId: sevaRequest.id,
      serviceType: sevaRequest.serviceType,
      donationType: payload.donationType,
      donorName: payload.donorName,
      donorEmail: payload.donorEmail,
    });

    sevaRequest.sponsors.push({
      name: payload.donorName,
      email: payload.donorEmail,
      phone: payload.donorPhone || undefined,
      amount,
      donationType: payload.donationType,
      paymentGateway: "Razorpay",
      paymentStatus: "Created",
      razorpayOrderId: order.id,
      createdAt: new Date(),
    });

    await sevaRequest.save();

    res.json({
      message: "Sponsorship order created successfully",
      keyId: env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount,
      currency: order.currency,
      request: sevaRequest,
    });
  } catch (error) {
    res.status(502).json({
      message:
        error instanceof Error && error.message === "Razorpay credentials are not configured"
          ? "Razorpay is not configured on the server"
          : "Unable to create sponsorship order",
    });
  }
});

export const verifySevaSponsorshipPayment = asyncHandler(async (req: Request, res: Response) => {
  const payload = sevaSponsorshipVerifySchema.parse(req.body);
  const sevaRequest = await SevaRequest.findById(req.params.id);

  if (!sevaRequest) {
    res.status(404).json({ message: "Seva request not found" });
    return;
  }

  if (!verifyRazorpaySignature(payload.razorpay_order_id, payload.razorpay_payment_id, payload.razorpay_signature)) {
    res.status(400).json({ message: "Invalid payment signature" });
    return;
  }

  const sponsor = sevaRequest.sponsors.find(
    (entry) => entry.razorpayOrderId === payload.razorpay_order_id,
  );

  if (!sponsor) {
    res.status(404).json({ message: "Sponsorship order not found" });
    return;
  }

  if (sponsor.paymentStatus !== "Paid") {
    sponsor.paymentStatus = "Paid";
    sponsor.razorpayPaymentId = payload.razorpay_payment_id;
    sevaRequest.amountCollected += sponsor.amount;
    sevaRequest.lastSponsoredAt = new Date();
    sevaRequest.fundingStatus = deriveFundingStatus(sevaRequest.amountCollected, sevaRequest.amountRequired);

    if (sevaRequest.fundingStatus === "Funded" && sevaRequest.status === "Approved") {
      sevaRequest.status = "In Progress";
    }

    sevaRequest.markModified("sponsors");
    await sevaRequest.save();
  }

  res.json({
    message: "Payment verified successfully",
    request: sevaRequest,
  });
});
