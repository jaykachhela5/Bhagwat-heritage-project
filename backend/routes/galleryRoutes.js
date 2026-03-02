const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary"); // fixed path
const Image = require("../models/Image");
const streamifier = require("streamifier"); // required

/* MEMORY STORAGE FOR CLOUDINARY */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================= UPLOAD IMAGE ================= */
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Wrap upload_stream in a Promise
    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "bhsft_gallery" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });

    const result = await uploadToCloudinary(req.file.buffer);

    const newImg = new Image({
      imageUrl: result.secure_url,
      publicId: result.public_id
    });

    await newImg.save();
    res.json({ success: true, image: newImg });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ================= GET IMAGES ================= */
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE IMAGE ================= */
router.delete("/:id", async (req, res) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) return res.status(404).json({ message: "Image not found" });

    await cloudinary.uploader.destroy(img.publicId);
    await img.deleteOne();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
