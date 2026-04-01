import { Router } from "express";
import { getLibraryStats, updateLibraryStats } from "../controllers/libraryStatsController";

const router = Router();

router.get("/", getLibraryStats);
router.put("/", updateLibraryStats);

export default router;
