import { AuthRequest } from "../types/auth.types";
import { Response } from "express";
import { JobSchema } from "../validators/jobValidator";
import { prisma } from "../db/dbConfig";

// Get All Jobs
export const getAllJobs = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    const jobs = await prisma.jobs.findMany({
      where: { userId },
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No jobs found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All jobs fetched successfully!",
      data: jobs,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Get Job By Id
export const getJobById = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const jobId = Number(req.params.id);

  if (!jobId) {
    return res.status(400).json({
      success: false,
      message: "Invalid JobId paramter",
    });
  }

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    const job = await prisma.jobs.findFirst({
      where: { id: jobId, userId },
    });

    if (!job) {
      return res.status(404).json({
        success: true,
        message: "No job found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully!",
      data: job,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Create Job
export const createJob = async (req: AuthRequest, res: Response) => {
  const result = JobSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Check your inputs",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    let job = await prisma.jobs.create({
      data: {
        userId,
        ...result.data,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Update Job - wip

// Delete Job By Id
export const deleteJob = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const jobId = Number(req.params.id);

  if (!jobId) {
    return res.status(400).json({
      success: false,
      message: "Invalid JobId paramter",
    });
  }

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    let result = await prisma.jobs.deleteMany({
      where: { id: jobId, userId },
    });

    if (result.count === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
