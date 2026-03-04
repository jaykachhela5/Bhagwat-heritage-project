import { Router } from "express";
import { getCultural, createCultural } from "../controllers/culturalController";

const router = Router();

router.get("/", getCultural);
router.post("/", createCultural);

export default router;
