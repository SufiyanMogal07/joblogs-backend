import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (res: Response, userId: string): string => {
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
  const isProduction = process.env.NODE_ENV === "production";
  const domain = process.env.COOKIE_DOMAIN;

  res.cookie(cookieName, token, {
    domain: isProduction ? domain : undefined,
    secure: true,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    path: "/",
  });
};
