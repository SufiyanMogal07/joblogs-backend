import { RequestHandler } from "express";

export const verifyCronSecret: RequestHandler = (req, res, next) => {
  const secret_key = req.headers["x-cron-secret"];

  if (secret_key !== process.env.CRON_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }

  next();
};
