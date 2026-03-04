import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { env } from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";
import { signupSchema, loginSchema } from "../schemas/auth.schemas";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = signupSchema.parse(req.body);

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();

  res.status(201).json({ message: "Signup Successful" });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    res.json({ success: false });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.json({ success: false });
    return;
  }

  const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as `${number}${"d" | "h" | "m" | "s"}`,
  });

  res.json({ success: true, name: user.name, token, role: user.role });
});
