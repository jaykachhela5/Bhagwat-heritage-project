import { Router } from "express";
import multer from "multer";
import { uploadLimiter } from "../middleware/rateLimiter";
import {
  createKundliRequest,
  getAllKundliRequests,
  getKundliRequestById,
  updateKundliRequestStatus,
  uploadKundliReport,
} from "../controllers/kundliController";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/create", uploadLimiter, createKundliRequest);
router.get("/all", getAllKundliRequests);
router.get("/:id", getKundliRequestById);
router.put("/status/:id", updateKundliRequestStatus);
router.put("/report/:id", uploadLimiter, upload.single("reportPdf"), uploadKundliReport);

export default router;
