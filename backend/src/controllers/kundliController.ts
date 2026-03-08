import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { Request, Response } from "express";
import KundliRequest from "../models/KundliRequest";
import { asyncHandler } from "../utils/asyncHandler";
import { kundliCreateSchema, kundliStatusSchema } from "../schemas/kundli.schemas";
import { sendKundliOrderMail } from "../utils/sendKundliOrderMail";

const KUNDLI_UPLOAD_ROOT = path.resolve(process.cwd(), "uploads", "kundli");

function createOrderId() {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `KND-${dateStamp}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function createInvoiceNumber() {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `INV-KND-${dateStamp}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function buildPublicFileUrl(req: Request, relativePath: string) {
  return `${req.protocol}://${req.get("host")}${relativePath.replace(/\\/g, "/")}`;
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, "-");
}

async function saveUploadedFile(req: Request, file: Express.Multer.File, folder: "reports") {
  const destination = path.join(KUNDLI_UPLOAD_ROOT, folder);
  await fs.mkdir(destination, { recursive: true });

  const ext = path.extname(file.originalname) || "";
  const storedName = `${Date.now()}-${randomUUID()}${ext}`;
  const absolutePath = path.join(destination, storedName);
  await fs.writeFile(absolutePath, file.buffer);

  const publicPath = `/uploads/kundli/${folder}/${storedName}`;

  return {
    originalName: sanitizeFilename(file.originalname),
    publicUrl: buildPublicFileUrl(req, publicPath),
  };
}

export const createKundliRequest = asyncHandler(async (req: Request, res: Response) => {
  const data = kundliCreateSchema.parse(req.body);

  let orderId = createOrderId();
  while (await KundliRequest.exists({ orderId })) {
    orderId = createOrderId();
  }

  let invoiceNumber = createInvoiceNumber();
  while (await KundliRequest.exists({ invoiceNumber })) {
    invoiceNumber = createInvoiceNumber();
  }

  const order = new KundliRequest({
    ...data,
    signature: data.signature || undefined,
    address: data.address || undefined,
    orderId,
    invoiceNumber,
    orderStatus: "Pending",
    estimatedDeliveryTime: "3-5 working days",
  });

  await order.save();

  await sendKundliOrderMail({
    fullName: order.fullName,
    email: order.email,
    orderId: order.orderId,
    invoiceNumber: order.invoiceNumber,
    totalAmount: order.totalAmount,
    paymentMethod: order.paymentMethod,
    selectedServices: order.selectedServices.map((service) => service.title),
  });

  res.status(201).json({
    message: "Kundli order submitted successfully",
    order,
    orderId: order.orderId,
    invoiceNumber: order.invoiceNumber,
    estimatedDeliveryTime: order.estimatedDeliveryTime,
    paymentStatus: order.paymentStatus,
  });
});

export const getAllKundliRequests = asyncHandler(async (_req: Request, res: Response) => {
  const orders = await KundliRequest.find({ isDeleted: false }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getKundliRequestById = asyncHandler(async (req: Request, res: Response) => {
  const order = await KundliRequest.findById(req.params.id);
  if (!order || order.isDeleted) {
    res.status(404).json({ message: "Kundli order not found" });
    return;
  }
  res.json(order);
});

export const updateKundliRequestStatus = asyncHandler(async (req: Request, res: Response) => {
  const payload = kundliStatusSchema.parse(req.body);
  const order = await KundliRequest.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus: payload.orderStatus,
      adminNotes: payload.adminNotes,
      ...(payload.estimatedDeliveryTime ? { estimatedDeliveryTime: payload.estimatedDeliveryTime } : {}),
    },
    { new: true },
  );

  if (!order) {
    res.status(404).json({ message: "Kundli order not found" });
    return;
  }

  res.json({ message: "Kundli order updated", order });
});

export const uploadKundliReport = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No PDF report uploaded" });
    return;
  }

  const fileData = await saveUploadedFile(req, req.file, "reports");
  const order = await KundliRequest.findByIdAndUpdate(
    req.params.id,
    {
      reportFileName: fileData.originalName,
      reportFileUrl: fileData.publicUrl,
      orderStatus: "Completed",
    },
    { new: true },
  );

  if (!order) {
    res.status(404).json({ message: "Kundli order not found" });
    return;
  }

  res.json({ message: "Kundli report uploaded", order });
});
