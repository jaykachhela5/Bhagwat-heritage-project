import { Router } from "express";
import { addMember, getMembers, updateMemberStatus } from "../controllers/memberController";

const router = Router();

router.post("/", addMember);
router.get("/", getMembers);
router.put("/:id/status", updateMemberStatus);

export default router;
