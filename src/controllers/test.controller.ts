import { Request, RequestHandler, Response } from "express";
import { AuthRequest } from "../types/auth.types";



export const testController = (req: AuthRequest,res: Response) => {
    console.log(req.user);

    return res.status(200).json({
        message: "Testing...",
        data: req.user
    })
}