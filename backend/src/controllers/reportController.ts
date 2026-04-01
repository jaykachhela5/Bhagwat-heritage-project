import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { Request, Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import Report from "../models/Report";
import { asyncHandler } from "../utils/asyncHandler";
import { buildCsv } from "../utils/csv";
import {
  reportCreateSchema,
  reportExpenseItemSchema,
  reportUpdateSchema,
} from "../schemas/report.schemas";

const REPORT_UPLOAD_ROOT = path.resolve(process.cwd(), "uploads", "reports");

function buildPublicFileUrl(req: Request, relativePath: string) {
  return `${req.protocol}://${req.get("host")}${relativePath.replace(/\\/g, "/")}`;
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, "-");
}

async function saveUploadedPdf(req: Request, file: Express.Multer.File) {
  const destination = path.join(REPORT_UPLOAD_ROOT, "pdfs");
  await fs.mkdir(destination, { recursive: true });

  const ext = path.extname(file.originalname) || ".pdf";
  const storedName = `${Date.now()}-${randomUUID()}${ext}`;
  const absolutePath = path.join(destination, storedName);
  await fs.writeFile(absolutePath, file.buffer);

  const publicPath = `/uploads/reports/pdfs/${storedName}`;

  return {
    originalName: sanitizeFilename(file.originalname),
    publicUrl: buildPublicFileUrl(req, publicPath),
  };
}

async function uploadReportImage(file: Express.Multer.File) {
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "reports/images", resource_type: "image" },
      (error, uploaded) => {
        if (error || !uploaded) {
          reject(error ?? new Error("Image upload failed"));
          return;
        }

        resolve(uploaded);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

function parseJsonField<T>(value: unknown, parser: (input: unknown) => T) {
  if (typeof value === "string") {
    return parser(JSON.parse(value));
  }

  return parser(value);
}

function parseHighlights(value: unknown) {
  return parseJsonField(value ?? [], (input) => reportCreateSchema.shape.highlights.parse(input));
}

function parseExpenseBreakdown(value: unknown) {
  return parseJsonField(value, (input) => reportExpenseItemSchema.array().parse(input));
}

function getUploadFiles(req: Request) {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

  return {
    images: files?.images ?? [],
    reportPdf: files?.reportPdf?.[0],
  };
}

export const getPublicReports = asyncHandler(async (_req: Request, res: Response) => {
  const reports = await Report.find({ isPublished: true }).sort({ createdAt: -1 });
  res.json(reports);
});

export const getAdminReports = asyncHandler(async (_req: Request, res: Response) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
});

export const createReport = asyncHandler(async (req: Request, res: Response) => {
  const files = getUploadFiles(req);
  const payload = reportCreateSchema.parse({
    title: req.body.title,
    monthLabel: req.body.monthLabel,
    summary: req.body.summary,
    highlights: parseHighlights(req.body.highlights),
    expenseBreakdown: parseExpenseBreakdown(req.body.expenseBreakdown),
    videoUrl: req.body.videoUrl,
    isPublished: req.body.isPublished,
  });

  const uploadedImages = await Promise.all(files.images.map((file) => uploadReportImage(file)));
  const uploadedPdf = files.reportPdf ? await saveUploadedPdf(req, files.reportPdf) : undefined;

  const report = await Report.create({
    ...payload,
    images: uploadedImages.map((item) => item.secure_url),
    imagePublicIds: uploadedImages.map((item) => item.public_id),
    pdfName: uploadedPdf?.originalName,
    pdfUrl: uploadedPdf?.publicUrl,
  });

  res.status(201).json({ message: "Report created", report });
});

export const updateReport = asyncHandler(async (req: Request, res: Response) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404).json({ message: "Report not found" });
    return;
  }

  const files = getUploadFiles(req);
  const payload = reportUpdateSchema.parse({
    title: req.body.title,
    monthLabel: req.body.monthLabel,
    summary: req.body.summary,
    highlights: req.body.highlights !== undefined ? parseHighlights(req.body.highlights) : undefined,
    expenseBreakdown: req.body.expenseBreakdown !== undefined ? parseExpenseBreakdown(req.body.expenseBreakdown) : undefined,
    videoUrl: req.body.videoUrl,
    isPublished: req.body.isPublished,
  });

  if (payload.title !== undefined) report.title = payload.title;
  if (payload.monthLabel !== undefined) report.monthLabel = payload.monthLabel;
  if (payload.summary !== undefined) report.summary = payload.summary;
  if (payload.highlights !== undefined) report.highlights = payload.highlights;
  if (payload.expenseBreakdown !== undefined) report.expenseBreakdown = payload.expenseBreakdown;
  if (payload.videoUrl !== undefined) report.videoUrl = payload.videoUrl;
  if (payload.isPublished !== undefined) report.isPublished = payload.isPublished;

  if (files.images.length > 0) {
    const uploadedImages = await Promise.all(files.images.map((file) => uploadReportImage(file)));
    report.images.push(...uploadedImages.map((item) => item.secure_url));
    report.imagePublicIds.push(...uploadedImages.map((item) => item.public_id));
  }

  if (files.reportPdf) {
    const uploadedPdf = await saveUploadedPdf(req, files.reportPdf);
    report.pdfName = uploadedPdf.originalName;
    report.pdfUrl = uploadedPdf.publicUrl;
  }

  await report.save();

  res.json({ message: "Report updated", report });
});

export const deleteReport = asyncHandler(async (req: Request, res: Response) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404).json({ message: "Report not found" });
    return;
  }

  await Promise.all(report.imagePublicIds.map((publicId) => cloudinary.uploader.destroy(publicId)));
  await report.deleteOne();

  res.json({ message: "Report deleted" });
});

export const getReportAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const reports = await Report.find();

  const totalExpense = reports.reduce(
    (sum, report) => sum + report.expenseBreakdown.reduce((reportSum, item) => reportSum + item.amount, 0),
    0,
  );

  res.json({
    totalReports: reports.length,
    publishedReports: reports.filter((report) => report.isPublished).length,
    totalExpense,
    photoCount: reports.reduce((sum, report) => sum + report.images.length, 0),
  });
});

export const exportReportsCsv = asyncHandler(async (_req: Request, res: Response) => {
  const reports = await Report.find().sort({ createdAt: -1 });

  const csv = buildCsv(
    [
      "Title",
      "Month",
      "Summary",
      "Published",
      "Expense Total",
      "Image Count",
      "PDF",
      "Created At",
    ],
    reports.map((report) => [
      report.title,
      report.monthLabel,
      report.summary,
      report.isPublished ? "Yes" : "No",
      report.expenseBreakdown.reduce((sum, item) => sum + item.amount, 0),
      report.images.length,
      report.pdfUrl ?? "",
      report.createdAt,
    ]),
  );

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=reports.csv");
  res.send(csv);
});
