import express from "express";
import { createJob, getAllJobs,getJobById, deleteJob, updateJob, searchJob, updateJobStatus, getJobMetaData } from "../controllers/job.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

//#region  //*========== Job Routes ==========

// Get -> Job Meta Data - Job Source and Status
router.get("/meta-data",getJobMetaData);

// Get -> /api/jobs - Get All Jobs related to user
router.get("/", getAllJobs);

router.get("/search",searchJob);

// Get -> /api/jobs/:id - Get One Job By Id
router.get("/:id", getJobById);

// POST -> /api/jobs - Create Jobs
router.post("/",createJob);

// PATCH -> /api/jobs
router.patch("/:id",updateJob);

// PATCH -> /api/jobs/status
router.patch("/:id/status",updateJobStatus);

// DELETE -> /api/jobs/:id - Delete Job By Id
router.delete("/:id", deleteJob);

//#endregion  //*========== Job Routes ==========

export default router;
