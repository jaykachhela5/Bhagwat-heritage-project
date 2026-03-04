import { Router } from "express";
import { submitAdmission, getStudents } from "../controllers/pathshalaController";

const router = Router();

router.post("/", submitAdmission);
router.get("/", getStudents);

export default router;
