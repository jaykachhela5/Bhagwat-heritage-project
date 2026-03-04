import { Router } from "express";
import { joinInvolved, getInvolved, deleteInvolved } from "../controllers/involvedController";

const router = Router();

router.post("/join", joinInvolved);
router.get("/", getInvolved);
router.delete("/:id", deleteInvolved);

export default router;
