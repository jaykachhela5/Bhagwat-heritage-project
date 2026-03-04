import { Router } from "express";
import multer from "multer";
import { uploadImage, getImages, deleteImage } from "../controllers/galleryController";
import { uploadLimiter } from "../middleware/rateLimiter";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/upload", uploadLimiter, upload.single("image"), uploadImage);
router.get("/", getImages);
router.delete("/:id", deleteImage);

export default router;
