import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUserMetrics, getUserProfile, updateUserProfile } from "../controllers/user.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/metrics", getUserMetrics);
router.get("/profile", getUserProfile);
router.post("/profile", updateUserProfile)

export default router;
