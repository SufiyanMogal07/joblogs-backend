import { RequestHandler } from "express";
import { AuthRequest } from "../types/auth.types";
import { prisma } from "../db/dbConfig";
import { UserProfileSchema } from "../validators/userValidator";

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
    let data = await prisma.jobs.groupBy({
      where: {
        userId,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const totalApplication = data.reduce(
      (total, value) => total + value._count.status,
      0,
    );

    let totalData = {
      status: "total" as any,
      _count: {
        status: totalApplication || 0,
      },
    };

    const responseData = [...data,totalData];

    return res.json({
      success: true,
      message: "All Metrics Data Fetched",
      data: responseData,
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

  try {
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const isEmailAlreadyExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailAlreadyExist) {
      const isCurrentEmail = authRequest.user?.email === email;

      return res.status(409).json({
        success: false,
        message: isCurrentEmail
          ? "This is already your current email address."
          : "This email address is already taken by another account.",
      });
    }

    const data = await prisma.user.update({
      where: { id: userId },
      omit: { id: true, password: true },
      data: {
        ...req.body,
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
