import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authorized — no token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  req.user = user;
  next();
});
