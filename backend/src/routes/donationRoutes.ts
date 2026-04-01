import { Router } from "express";
import {
  createDonation,
  createDonationOrder,
  createDonationSubscription,
  exportDonationsCsv,
  getDonationAnalytics,
  getDonations,
  verifyDonationPayment,
} from "../controllers/donationController";
import { protect } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.post("/order", createDonationOrder);
router.post("/subscription", createDonationSubscription);
router.post("/verify", verifyDonationPayment);
router.get("/analytics", protect, requireRole("admin"), getDonationAnalytics);
router.get("/export", protect, requireRole("admin"), exportDonationsCsv);
router.get("/", getDonations);
router.post("/", createDonation);

export default router;
