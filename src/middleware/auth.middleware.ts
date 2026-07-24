import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/dbConfig";
import { AuthRequest } from "../types/auth.types";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Authorization token missing!",
    });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const decoded = jwt.verify(token, secretKey) as {id: string};

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User!",
      });
    }

    req.user = {
      id: user.id,
      email: user.email
    };
    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expire token",
    });
  }
};
