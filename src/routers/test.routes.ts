import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { testController } from "../controllers/test.controller";

const router = express.Router();

router.post("/",authMiddleware, testController);

export default router;