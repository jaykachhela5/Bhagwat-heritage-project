import type { Request, Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import Media from "../models/Media";
import { asyncHandler } from "../utils/asyncHandler";

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    res.status(400).json({ message: "No files uploaded" });
    return;
  }

  const uploaded = await Promise.all(
    files.map(
      (file) =>
        new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "bhsft_media" },
            (error, result) => {
              if (error || !result) return reject(error ?? new Error("Upload failed"));
              resolve(result);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        })
    )
  );

  const saved = await Media.insertMany(
    uploaded.map((r, i) => ({
      filename: files[i].originalname,
      path: r.secure_url,
      cloudinary_id: r.public_id,
    }))
  );

  res.json({ message: "Uploaded Successfully", media: saved });
});

export const getMedia = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(String(req.query.page ?? "1"), 10);
  const limit = 8;
  const search = String(req.query.search ?? "");

  const filter = search ? { filename: { $regex: search, $options: "i" } } : {};

  const [total, data] = await Promise.all([
    Media.countDocuments(filter),
    Media.find(filter)
      .sort({ uploadDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
  ]);

  res.json({ data, total, page, pages: Math.ceil(total / limit) });
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await Media.findById(req.params.id);
  if (!media) {
    res.status(404).json({ message: "Media not found" });
    return;
  }

  await cloudinary.uploader.destroy(media.cloudinary_id);
  await Media.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted Successfully" });
});
