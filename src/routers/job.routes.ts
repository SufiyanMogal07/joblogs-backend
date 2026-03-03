import express from "express";
import { createJob } from "../controllers/job.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createJob);

export default router;
