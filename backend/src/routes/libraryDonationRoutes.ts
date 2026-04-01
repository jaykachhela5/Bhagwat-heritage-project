import { Router } from "express";
import { createLibraryDonation, getLibraryDonations } from "../controllers/libraryDonationController";

const router = Router();

router.post("/", createLibraryDonation);
router.get("/", getLibraryDonations);

export default router;
