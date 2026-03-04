import { Router } from "express";
import multer from "multer";
import { getEvents, createEvent, registerEvent } from "../controllers/eventController";
import { uploadLimiter } from "../middleware/rateLimiter";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get("/", getEvents);
router.post("/", uploadLimiter, upload.single("image"), createEvent);
router.post("/register", registerEvent);

export default router;
