import { Router } from "express";
import multer from "multer";
import {
  createSevaRequest,
  createSevaSponsorshipOrder,
  getAdminSevaRequests,
  getLiveSevaRequests,
  updateSevaRequestAdmin,
  uploadCompletionProof,
  verifySevaSponsorshipPayment,
} from "../controllers/sevaController";
import { protect } from "../middleware/auth";
import { uploadLimiter } from "../middleware/rateLimiter";
import { requireRole } from "../middleware/role";

const router = Router();

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      callback(Object.assign(new Error("Only image uploads are allowed"), { statusCode: 400 }));
      return;
    }

    callback(null, true);
  },
});

router.post("/", uploadLimiter, imageUpload.single("image"), createSevaRequest);
router.get("/live", getLiveSevaRequests);
router.get("/admin", protect, requireRole("admin"), getAdminSevaRequests);
router.patch("/:id/admin", protect, requireRole("admin"), updateSevaRequestAdmin);
router.put(
  "/:id/completion",
  protect,
  requireRole("admin"),
  uploadLimiter,
  imageUpload.array("completionImages", 6),
  uploadCompletionProof,
);
router.post("/:id/sponsorship/order", createSevaSponsorshipOrder);
router.post("/:id/sponsorship/verify", verifySevaSponsorshipPayment);

export default router;
