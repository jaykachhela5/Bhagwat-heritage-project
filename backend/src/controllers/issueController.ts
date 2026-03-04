import type { Request, Response } from "express";
import Issue from "../models/Issue";
import Book from "../models/Book";
import { asyncHandler } from "../utils/asyncHandler";
import { issueSchema } from "../schemas/issue.schemas";

export const issueBook = asyncHandler(async (req: Request, res: Response) => {
  const data = issueSchema.parse(req.body);
  const issue = new Issue({
    ...data,
    returnDate: data.returnDate ? new Date(data.returnDate) : undefined,
  });
  await issue.save();

  await Book.findByIdAndUpdate(data.bookId, { $inc: { available: -1 } });

  res.status(201).json({ message: "Book Issued Successfully" });
});

export const getIssues = asyncHandler(async (_req: Request, res: Response) => {
  const issues = await Issue.find().populate("bookId");
  res.json(issues);
});
