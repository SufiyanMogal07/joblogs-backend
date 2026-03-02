import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (res: Response, userId: number): string => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }

  const token = jwt.sign({ id: userId }, secret);

  setJWTCookie(res, "authToken", token);

  return token;
};

export const setJWTCookie = (
  res: Response,
  cookieName: string,
  token: string,
): void => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
