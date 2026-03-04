import { Router } from "express";
import { createDevotee } from "../controllers/devoteeController";

const router = Router();

router.post("/", createDevotee);

export default router;
