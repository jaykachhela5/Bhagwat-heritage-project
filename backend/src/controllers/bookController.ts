import type { Request, Response } from "express";
import Book from "../models/Book";
import { asyncHandler } from "../utils/asyncHandler";
import { bookSchema, bookUpdateSchema } from "../schemas/book.schemas";

export const getBooks = asyncHandler(async (_req: Request, res: Response) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

export const addBook = asyncHandler(async (req: Request, res: Response) => {
  const data = bookSchema.parse(req.body);
  const book = new Book({
    ...data,
    available: data.available ?? data.quantity ?? 0,
  });
  await book.save();
  res.status(201).json({ message: "Book Added Successfully", book });
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const payload = bookUpdateSchema.parse(req.body);
  const currentBook = await Book.findById(req.params.id);

  if (!currentBook) {
    res.status(404).json({ message: "Book not found" });
    return;
  }

  const nextQuantity = payload.quantity ?? currentBook.quantity ?? 0;
  const nextAvailable = payload.available ?? currentBook.available ?? nextQuantity;

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      ...payload,
      quantity: nextQuantity,
      available: Math.min(nextAvailable, nextQuantity),
    },
    { new: true }
  );

  res.json({ message: "Book Updated Successfully", book });
});

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book Deleted Successfully" });
});
