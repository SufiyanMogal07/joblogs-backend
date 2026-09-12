import express from "express";
import {
  runNotifications,
  updateEmailNotification,
} from "../controllers/notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { verifyCronSecret } from "../middleware/cron.secret.middleware";

const router = express.Router();

router.patch("/email",authMiddleware, updateEmailNotification);
router.get("/run", verifyCronSecret, runNotifications);

export default router;
