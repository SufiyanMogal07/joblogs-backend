import express from "express";
import { createJob, getAllJobs,getJobById, deleteJob } from "../controllers/job.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Authenticated Routes
router.use(authMiddleware); // Auth Middleware to check user is authenticated or not

// Get -> /api/jobs - Get All Jobs related to user
router.get("/", getAllJobs);

// Get -> /api/jobs/:id - Get One Job By Id
router.get("/:id", getJobById)

// POST -> /api/jobs - Create Jobs
router.post("/",createJob);

// PATCH -> /api/jobs
router.patch("/",()=> {})

// DELETE -> /api/jobs/:id - Delete Job By Id
router.delete("/:id", deleteJob)
export default router;
