import type { Request, Response } from "express";
import Contact from "../models/Contact";
import { asyncHandler } from "../utils/asyncHandler";
import { contactSchema } from "../schemas/contact.schemas";

export const saveContact = asyncHandler(async (req: Request, res: Response) => {
  const data = contactSchema.parse(req.body);
  const contact = new Contact(data);
  await contact.save();
  res.status(201).json({ message: "Message sent successfully!" });
});
