import { Router } from "express";
import {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
  deleteVolunteer,
} from "../controllers/volunteerController";

const router = Router();

router.post("/create", createVolunteer);
router.get("/all", getAllVolunteers);
router.get("/:id", getVolunteerById);
router.put("/status/:id", updateVolunteerStatus);
router.delete("/delete/:id", deleteVolunteer);

export default router;
