import { AuthRequest } from "../types/auth.types";
import { Response } from "express";

export const createJob = (req: AuthRequest,res: Response) => {
    return res.json({message: "working..."})

}