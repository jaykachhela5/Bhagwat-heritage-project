import type { Request, Response } from "express";
import Issue from "../models/Issue";
import Book from "../models/Book";
import { asyncHandler } from "../utils/asyncHandler";
import { issueSchema, issueUpdateSchema } from "../schemas/issue.schemas";

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

export const updateIssue = asyncHandler(async (req: Request, res: Response) => {
  const payload = issueUpdateSchema.parse(req.body);
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    res.status(404).json({ message: "Issue record not found" });
    return;
  }

  const previousStatus = issue.status;

  if (payload.status) {
    issue.status = payload.status;
  }

  if (payload.returnDate) {
    issue.returnDate = new Date(payload.returnDate);
  } else if (payload.status === "Returned" && !issue.returnDate) {
    issue.returnDate = new Date();
  }

  await issue.save();

  if (issue.bookId) {
    if (previousStatus !== "Returned" && issue.status === "Returned") {
      await Book.findByIdAndUpdate(issue.bookId, { $inc: { available: 1 } });
    }

    if (previousStatus === "Returned" && issue.status === "Issued") {
      await Book.findByIdAndUpdate(issue.bookId, { $inc: { available: -1 } });
    }
  }

  const updatedIssue = await Issue.findById(issue._id).populate("bookId");
  res.json({ message: "Issue updated successfully", issue: updatedIssue });
});
