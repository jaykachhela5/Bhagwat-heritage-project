import { Router } from "express";
import { getSpiritual, createSpiritual } from "../controllers/spiritualController";

const router = Router();

router.get("/", getSpiritual);
router.post("/", createSpiritual);

export default router;
