import { Router } from "express";
import { getBooks, addBook, updateBook, deleteBook } from "../controllers/bookController";

const router = Router();

router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
