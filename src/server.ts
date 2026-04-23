import "dotenv/config";
import express from "express";
import { connectDB, prisma } from "./db/dbConfig";
import authRoutes from "./routers/auth.routes";
import testRoutes from "./routers/test.routes";
import jobRoutes from "./routers/job.routes";
import userRoutes from "./routers/user.routes";
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
app.use(`${prefixApi}/auth`, authRoutes);
app.use(`${prefixApi}/test`, testRoutes);
app.use(`${prefixApi}/jobs`, jobRoutes);
app.use(`${prefixApi}/user`, userRoutes);


app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send("I am awake!");
  } catch (error) {
    res.status(500).send("DB error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", () => {
  console.log("Server shutting down");
  process.exit(1);
});
