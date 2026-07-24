import { RequestHandler } from "express";
import { AuthRequest } from "../types/auth.types";
import { prisma } from "../db/dbConfig";
import { UserProfileSchema } from "../validators/userValidator";
import { JobStatus } from "../generated/prisma/enums";

type MetricWithStatus = JobStatus | "total";

const METRICS_ORDER: MetricWithStatus[] = [
  "total",
  "draft",
  "applied",
  "interviewing",
  "onhold",
  "offer",
  "rejected",
  "ghosted",
];

const METRICS_LABELS : Record<MetricWithStatus, string> = {
  total: "Jobs Tracked",
  draft: "Draft Jobs",
  applied: "Application Sent",
  interviewing: "Interviewing",
  onhold: "On Hold",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
} as const;

interface MetricData {
  status: MetricWithStatus;
  label: string;
  count: number;
}

export const getUserMetrics: RequestHandler = async (req, res) => {
  const authRequest = req as AuthRequest;
  const userId = authRequest.user?.id;

  if (!userId) {
    return res.status(500).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    let data = await prisma.job.groupBy({
      where: {
        userId,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });

    let totalCount = data.reduce((total, value) => total + value._count.status, 0) || 0;

    const countMap: Map<MetricWithStatus, number> = new Map(
      data.map((d) => [d.status, d._count.status]),
    );

    let finalData: MetricData[] = METRICS_ORDER.map((status) => {
      return {
        status,
        label: METRICS_LABELS[status],
        count: status==="total" ? totalCount : countMap.get(status) ?? 0,
      };
    });

    return res.json({
      success: true,
      message: "All Metrics Data Fetched",
      data: finalData,
    });

  } catch (error) {
    console.error("Something went wrong in user metrics", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getUserProfile: RequestHandler = async (req, res) => {
  const authRequest = req as AuthRequest;
  const userId = authRequest.user?.id;

  try {
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const data = await prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const updateUserProfile: RequestHandler = async (req, res) => {
  const result = UserProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Check your inputs",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const email = req.body.email;

  const authRequest = req as AuthRequest;
  const userId = authRequest.user?.id;
  const existingEmail = authRequest.user?.email;

  try {
    if (!userId || !existingEmail) {
      return res.status(500).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const currentProfileData = await prisma.user.findUnique({
      where: {
        email: existingEmail,
        id: userId,
      },
    });

    if (!currentProfileData) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Check both fields are same or not if same return No Changes Needeed
    // if the email is same and name is different remove the email same vice versa step with name
    // if both are not same then update them.
    // check if the email already exist or not inside if email is not same and email and name both are not same

    // change the type of these
    let finalData: { name?: string; email?: string } = {};

    let requestData = result.data;

    let checkEmailExist: boolean = false;

    if (
      requestData.email === currentProfileData.email &&
      requestData.name === currentProfileData.name
    ) {
      return res.status(200).json({
        success: true,
        message: "Profile is already up to date. No changes needed.",
        data: currentProfileData,
      });
    }

    // TO DO'S
    // Improve this logic alot manual checking happening here..
    if (
      requestData.email === currentProfileData.email &&
      requestData.name !== currentProfileData.name
    ) {
      finalData.name = requestData.name;
    }

    if (
      requestData.name === currentProfileData.name &&
      requestData.email !== currentProfileData.email
    ) {
      finalData.email = requestData.email;
      checkEmailExist = true;
    }

    if (
      requestData.name !== currentProfileData.name &&
      requestData.email !== currentProfileData.email
    ) {
      finalData = { ...requestData };
      checkEmailExist = true;
    }

    if (checkEmailExist) {
      const isEmailExist = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (isEmailExist) {
        return res.status(409).json({
          success: false,
          message: "Email already exists!",
        });
      }
    }

    const data = await prisma.user.update({
      where: { id: userId },
      omit: { id: true, password: true },
      data: {
        ...finalData,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User profile updated successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
