import { Router } from "express";
import multer from "multer";
import {
  createReport,
  deleteReport,
  exportReportsCsv,
  getAdminReports,
  getPublicReports,
  getReportAnalytics,
  updateReport,
} from "../controllers/reportController";
import { uploadLimiter } from "../middleware/rateLimiter";
import { protect } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get("/", getPublicReports);
router.get("/admin/all", protect, requireRole("admin"), getAdminReports);
router.get("/analytics", protect, requireRole("admin"), getReportAnalytics);
router.get("/export", protect, requireRole("admin"), exportReportsCsv);
router.post(
  "/",
  protect,
  requireRole("admin"),
  uploadLimiter,
  upload.fields([
    { name: "images", maxCount: 6 },
    { name: "reportPdf", maxCount: 1 },
  ]),
  createReport,
);
router.put(
  "/:id",
  protect,
  requireRole("admin"),
  uploadLimiter,
  upload.fields([
    { name: "images", maxCount: 6 },
    { name: "reportPdf", maxCount: 1 },
  ]),
  updateReport,
);
router.delete("/:id", protect, requireRole("admin"), deleteReport);

export default router;
