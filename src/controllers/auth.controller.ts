import { prisma } from "../db/dbConfig";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt/jwt";
import {
  loginInputSchema,
  registerInputSchema,
} from "../validators/authValidator";

export const registerUser = async (
  req: Request<{}, {}, registerInputSchema>,
  res: Response,
) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    let token = generateToken(res, user.id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      authToken: token,
    });
  } catch (err) {
    console.error("Internal Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const loginUser = async (
  req: Request<{}, {}, loginInputSchema>,
  res: Response,
) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  console.log(existingUser);

  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "User registration not found",
    });
  }

  const isPassMatching = await bcrypt.compare(password, existingUser.password);

  if (!isPassMatching) {
    return res.status(401).json({
      success: false,
      message: "User's email or password is invalid",
    });
  }

  let token = generateToken(res, existingUser.id);

  return res.status(200).json({
    success: true,
    message: "Login Successfull!",
    data: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    },
    token,
  });
};
