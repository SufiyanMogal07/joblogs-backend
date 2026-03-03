import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.flatten(),
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
