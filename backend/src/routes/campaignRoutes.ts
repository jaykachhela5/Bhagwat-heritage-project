import { Router } from "express";
import {
  createCampaign,
  deleteCampaign,
  exportCampaignsCsv,
  getAdminCampaigns,
  getCampaignAnalytics,
  getPublicCampaigns,
  updateCampaign,
} from "../controllers/campaignController";
import { protect } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.get("/", getPublicCampaigns);
router.get("/admin/all", protect, requireRole("admin"), getAdminCampaigns);
router.get("/analytics", protect, requireRole("admin"), getCampaignAnalytics);
router.get("/export", protect, requireRole("admin"), exportCampaignsCsv);
router.post("/", protect, requireRole("admin"), createCampaign);
router.put("/:id", protect, requireRole("admin"), updateCampaign);
router.delete("/:id", protect, requireRole("admin"), deleteCampaign);

export default router;
