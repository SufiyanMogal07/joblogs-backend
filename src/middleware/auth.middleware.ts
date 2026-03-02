import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: any) => {
  const authCookie = req?.cookies?.authToken;

  if (!authCookie) {
    return res.status(400).json({
      success: false,
      message: "Authorization jwt cookie missing!",
    });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const userId = jwt.verify(authCookie, secretKey);

    if (userId) {
      next();
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error("Token parsing failed", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
