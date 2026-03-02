import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter, log: process.env.NODE_ENV === "development" ? ["error","info","query","warn"] : ["error"] });

export const connectDB = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected sucessfully!");
  } catch (err) {
    console.error("Error while connecting database", err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};
