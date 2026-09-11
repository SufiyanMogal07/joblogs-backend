import express from "express"
import { updateEmailNotification } from "../controllers/notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();
router.use(authMiddleware);

router.patch("/email", updateEmailNotification);

export default router;