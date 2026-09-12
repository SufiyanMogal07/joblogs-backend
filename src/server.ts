import "dotenv/config";
import express from "express";
import { connectDB, prisma } from "./db/dbConfig";
import authRoutes from "./routers/auth.routes";
import jobRoutes from "./routers/job.routes";
import userRoutes from "./routers/user.routes";
import notificationRoutes from "./routers/notification.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT;

connectDB();

const prefixApi = "/api";

// App Routes
app.use(`${prefixApi}/notifications`,notificationRoutes);
app.use(`${prefixApi}/auth`, authRoutes);
app.use(`${prefixApi}/jobs`, jobRoutes);
app.use(`${prefixApi}/user`, userRoutes);

// Routes for cron job - ping endpoints
app.get(`${prefixApi}/server-health`, async (req, res) => {
  try {
    res.status(200).send("Server OK");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get(`${prefixApi}/db-health`, async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send("Database OK");
  } catch (error) {
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", () => {
  console.log("Server shutting down");
  process.exit(1);
});
