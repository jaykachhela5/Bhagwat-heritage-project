import type { Request, Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import Image from "../models/Image";
import { asyncHandler } from "../utils/asyncHandler";

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "bhsft_gallery" },
        (error, uploaded) => {
          if (error || !uploaded) return reject(error ?? new Error("Upload failed"));
          resolve(uploaded);
        }
      );
      streamifier.createReadStream(req.file!.buffer).pipe(stream);
    }
  );

  const image = await Image.create({
    imageUrl: result.secure_url,
    publicId: result.public_id,
  });

  res.json({ message: "Uploaded Successfully", image });
});

export const getImages = asyncHandler(async (_req: Request, res: Response) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
});

export const deleteImage = asyncHandler(async (req: Request, res: Response) => {
  const image = await Image.findById(req.params.id);
  if (!image) {
    res.status(404).json({ message: "Image not found" });
    return;
  }

  await cloudinary.uploader.destroy(image.publicId);
  await Image.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted Successfully" });
});
