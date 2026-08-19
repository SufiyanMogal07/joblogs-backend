import express from "express";
import { createJob, getAllJobs,getJobById, deleteJob, updateJob, searchJob, getSortData, getJobMetaData } from "../controllers/job.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

//#region  //*========== Job Routes ==========

// Get -> /api/jobs - Get All Jobs related to user
router.get("/", getAllJobs);

// Get -> /api/jobs/sort-data -> Get Job Sort Data
router.get("/sort-data",getSortData);

// Get -> /api/jobs/meta-data -> Get Job Meta Data
router.get("/meta-data",getJobMetaData);

// GET -> /api/jobs/search?q=""
router.get("/search",searchJob);

// Get -> /api/jobs/:id - Get One Job By Id
router.get("/:id", getJobById);

// POST -> /api/jobs - Create Jobs
router.post("/",createJob);

// PATCH -> /api/jobs
router.patch("/:id",updateJob);

// DELETE -> /api/jobs/:id - Delete Job By Id
router.delete("/:id", deleteJob);

//#endregion  //*========== Job Routes ==========

export default router;
