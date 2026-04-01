import { Router } from "express";
import {
  createVolunteer,
  exportVolunteersCsv,
  getAllVolunteers,
  getVolunteerAnalytics,
  getVolunteerById,
  updateVolunteerStatus,
  deleteVolunteer,
} from "../controllers/volunteerController";
import { protect } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.post("/create", createVolunteer);
router.post("/join", createVolunteer);
router.get("/analytics", protect, requireRole("admin"), getVolunteerAnalytics);
router.get("/export", protect, requireRole("admin"), exportVolunteersCsv);
router.get("/all", getAllVolunteers);
router.get("/:id", getVolunteerById);
router.put("/status/:id", updateVolunteerStatus);
router.delete("/delete/:id", deleteVolunteer);

export default router;
