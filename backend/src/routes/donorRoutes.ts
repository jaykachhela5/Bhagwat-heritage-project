import { Router } from "express";
import { createDonor } from "../controllers/donorController";

const router = Router();

router.post("/donor", createDonor);

export default router;
