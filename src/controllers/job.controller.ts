import { AuthRequest } from "../types/auth.types";
import { Response } from "express";
import { JobSchema, JobUpdateSchema } from "../validators/jobValidator";
import { prisma } from "../db/dbConfig";
import {
  FrontendSortByType,
  JobMetaDataSource,
  JobMetaDataStatus,
  SortByMapping,
  SortByType,
} from "../helper/job/job.helper";
import { JobSource, JobStatus } from "../generated/prisma/enums";
import { getQueryParam } from "../utils/query.utils";
import z from "zod";

export const searchJob = async (req: AuthRequest, res: Response) => {
  const searchQuery = req.query.q as string;

  if (typeof searchQuery !== "string" || searchQuery.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Empty Search Query!",
    });
  }

  // match the query with job positon and companyName
  const jobs = await prisma.job.findMany({
    where: {
      OR: [
        { companyName: { contains: searchQuery, mode: "insensitive" } },
        { position: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
    distinct: ["position", "companyName"],
    select: {
      position: true,
      companyName: true,
    },
    take: 5,
  });

  return res.status(200).json({
    success: true,
    message: "Job fetched successfully!",
    data: jobs,
  });
};

// Get All Jobs
// Sort By -> Newest Added (createdAt desc) => (default), Oldest Added (createdAt asc), Recently Updated (updatedAt desc), Company A–Z, Company Z–A, Priority First
// Filter By -> Job Status, Job Source

export const getAllJobs = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  let sortBy: SortByType = SortByType.Newest; // By default newest first

  const company = getQueryParam<string>(req.query.company);
  const position = getQueryParam<string>(req.query.position);

  const status = getQueryParam(req.query?.status, z.enum(JobStatus)) as
    | JobStatus
    | undefined;

  const source = getQueryParam(req.query?.source, z.enum(JobSource)) as
    | JobSource
    | undefined;

  const sortByValue = req.query?.sortBy
    ? String(req.query.sortBy as SortByType)
    : undefined;

  if (sortByValue) sortBy = sortByValue as SortByType;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId,
        ...(company && {
          companyName: {
            contains: company.replaceAll("-", " "),
            mode: "insensitive",
          },
        }),
        ...(position && {
          position: {
            contains: position.replaceAll("-", " "),
            mode: "insensitive",
          },
        }),
        ...(status && { status }),
        ...(source && { source }),
      },
      orderBy: SortByMapping[sortBy] || {},
      omit: { userId: true },
    });

    return res.status(200).json({
      success: true,
      data: jobs || [],
    });
  } catch (error) {
    let message = "Something went wrong while fetching jobs!";
    console.error(message, error);
    return res.status(500).json({
      success: false,
      message: message,
    });
  }
};

// Get Job By Id
export const getJobById = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

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
    const job = await prisma.job.findFirst({
      where: { id: jobId, userId },
      omit: { userId: true },
    });

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully!",
      data: job || [],
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
    const job = await prisma.$transaction(async (tx) => {
      const createdJob = await prisma.job.create({
        data: {
          userId,
          ...result.data,
        },
      });

      await tx.jobTimeline.create({
        data: {
          jobId: createdJob.id,
          toStatus: createdJob.status,
        },
      });

      return createJob;
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

// Update Job
export const updateJob = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!jobId || !userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid request!",
    });
  }

  const existingJob = await prisma.job.findUnique({
    where: { id: jobId, userId },
  });

  if (!existingJob) {
    return res.status(200).json({
      success: false,
      message: "Job not found",
    });
  }

  const result = JobUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Check your inputs",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { id, ...sanitizedData } = result.data;

  if (sanitizedData.status === "draft") sanitizedData.appliedAt = null;

  const currentStatus = sanitizedData.status;
  const existingStatus = existingJob.status;

  try {
    const job = await prisma.$transaction(async (tx) => {
      const updatedData = await prisma.job.update({
        where: { id: jobId, userId },
        data: sanitizedData,
      });

      if (currentStatus && currentStatus !== existingStatus) {
        await tx.jobTimeline.create({
          data: {
            jobId,
            fromStatus: existingStatus,
            toStatus: currentStatus,
          },
        });
      }

      return updatedData;
    });

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// Delete Job By Id
export const deleteJob = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

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
    let result = await prisma.job.deleteMany({
      where: { id: jobId, userId },
    });

    if (result.count === 0) {
      return res.status(200).json({ success: false, message: "Job not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSortData = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  let sortTypeData = FrontendSortByType;

  return res.status(200).json({
    success: true,
    data: sortTypeData,
  });
};

export const getJobMetaData = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  const jobStatus = JobMetaDataStatus.options;
  const jobSource = JobMetaDataSource.options;

  return res.status(200).json({
    success: true,
    data: {
      status: jobStatus,
      source: jobSource,
    },
  });
};
