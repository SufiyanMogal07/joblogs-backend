import "dotenv/config";
import express from "express";
import { connectDB } from "./db/dbConfig";
import authRoutes from "./routers/auth.routes";
import testRoutes from "./routers/test.routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT;

connectDB();

const prefixApi = "/api";
app.use(`${prefixApi}/auth`,authRoutes);

app.use(`${prefixApi}/test`, testRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
