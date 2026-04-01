import { Router } from "express";
import multer from "multer";
import { getEvents, createEvent, getMahotsavLive, registerEvent } from "../controllers/eventController";
import { uploadLimiter } from "../middleware/rateLimiter";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get("/", getEvents);
router.get("/mahotsav/live", getMahotsavLive);
router.post("/", uploadLimiter, upload.single("image"), createEvent);
router.post("/register", registerEvent);

export default router;
