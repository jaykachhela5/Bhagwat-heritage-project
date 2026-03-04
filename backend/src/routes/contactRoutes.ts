import { Router } from "express";
import { saveContact } from "../controllers/contactController";

const router = Router();

router.post("/contact", saveContact);

export default router;
