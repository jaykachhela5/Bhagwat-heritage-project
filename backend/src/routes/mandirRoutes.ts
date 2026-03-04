import { Router } from "express";
import { getMandir, updateMandir } from "../controllers/mandirController";

const router = Router();

router.get("/", getMandir);
router.put("/", updateMandir);

export default router;
