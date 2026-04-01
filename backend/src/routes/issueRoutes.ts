import { Router } from "express";
import { issueBook, getIssues, updateIssue } from "../controllers/issueController";

const router = Router();

router.post("/", issueBook);
router.get("/", getIssues);
router.put("/:id", updateIssue);

export default router;
