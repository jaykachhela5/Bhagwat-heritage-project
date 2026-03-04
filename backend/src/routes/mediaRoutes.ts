import { Router } from "express";
import multer from "multer";
import { uploadMedia, getMedia, deleteMedia } from "../controllers/mediaController";
import { uploadLimiter } from "../middleware/rateLimiter";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/upload", uploadLimiter, upload.array("images", 10), uploadMedia);
router.get("/media", getMedia);
router.delete("/:id", deleteMedia);

export default router;
