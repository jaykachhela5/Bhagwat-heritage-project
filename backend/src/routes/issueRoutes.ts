import { Router } from "express";
import { issueBook, getIssues } from "../controllers/issueController";

const router = Router();

router.post("/", issueBook);
router.get("/", getIssues);

export default router;
