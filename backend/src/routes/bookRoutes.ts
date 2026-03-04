import { Router } from "express";
import { getBooks, addBook, deleteBook } from "../controllers/bookController";

const router = Router();

router.get("/", getBooks);
router.post("/", addBook);
router.delete("/:id", deleteBook);

export default router;
