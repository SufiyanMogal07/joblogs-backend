import express from "express";
import { createJob } from "../controllers/job.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { JobSchema } from "../validators/jobValidator";

const router = express.Router();

router.use(authMiddleware);

router.post("/",validate(JobSchema), createJob);

export default router;
