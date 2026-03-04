import { Router } from "express";
import { addMember, getMembers } from "../controllers/memberController";

const router = Router();

router.post("/", addMember);
router.get("/", getMembers);

export default router;
