import { RequestHandler, Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { notificationSchema } from "../validators/notificationValidator";
import { prisma } from "../db/dbConfig";
import { processNotifications } from "../jobs/notificationJob";

export const updateEmailNotification = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const result = notificationSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "isEnabled needed and must be a boolean",
      });
    }

    const { isEnabled } = result.data;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailNotification: isEnabled,
      },
      select: {
        emailNotification: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: isEnabled
        ? "Email notifications enabled successfully."
        : "Email notifications disabled successfully.",
      data: {
        emailNotification: user.emailNotification,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update email notification.",
    });
  }
};

export const runNotifications: RequestHandler = async (req, res) => {
  await processNotifications();

  return res.status(200).json({
    success: true,
    message: "Notifications processed",
  });
};
