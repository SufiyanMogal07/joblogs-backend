import "dotenv/config";
import express from "express";
import { connectDB, prisma } from "./db/dbConfig";
import authRoutes from "./routers/auth.routes";
import testRoutes from "./routers/test.routes";
import jobRoutes from "./routers/job.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.get("/keep-alive", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Keep-alive successful");
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
