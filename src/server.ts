import "dotenv/config";
import express from "express";
import { connectDB } from "./db/dbConfig";
import authRoutes from "./routers/auth.routes";
import testRoutes from "./routers/test.routes";
import jobRoutes from "./routers/job.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT;

connectDB();

const prefixApi = "/api";
app.use(`${prefixApi}/auth`,authRoutes);
app.use(`${prefixApi}/test`, testRoutes);
app.use(`${prefixApi}/jobs`, jobRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT",() => {
  console.log("Server shutting down");
  process.exit(1);
});
