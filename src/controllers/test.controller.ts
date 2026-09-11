import { Response } from "express";
import { AuthRequest } from "../types/auth.types";

export const testController = async (req: AuthRequest,res: Response) => {
   console.log("Test Route..");

   return res.status(200).json({
    message: "Test message"
   })
}