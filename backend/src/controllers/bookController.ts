import type { Request, Response } from "express";
import Book from "../models/Book";
import { asyncHandler } from "../utils/asyncHandler";
import { bookSchema } from "../schemas/book.schemas";

export const getBooks = asyncHandler(async (_req: Request, res: Response) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

export const addBook = asyncHandler(async (req: Request, res: Response) => {
  const data = bookSchema.parse(req.body);
  const book = new Book(data);
  await book.save();
  res.status(201).json({ message: "Book Added Successfully" });
});

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book Deleted Successfully" });
});
