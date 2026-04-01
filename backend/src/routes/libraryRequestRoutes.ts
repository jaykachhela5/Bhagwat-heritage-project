import { Router } from "express";
import { createLibraryRequest, getLibraryRequests, updateLibraryRequestStatus } from "../controllers/libraryRequestController";

const router = Router();

router.post("/", createLibraryRequest);
router.get("/", getLibraryRequests);
router.put("/:id/status", updateLibraryRequestStatus);

export default router;
