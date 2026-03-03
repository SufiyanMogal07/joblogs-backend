import { prisma } from "../db/dbConfig";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt/jwt";
import {
  loginInputSchema,
  loginSchema,
  registerInputSchema,
  registerSchema,
} from "../validators/authValidator";

export const registerUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Check your inputs",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = result.data;

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
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Check your inputs",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { email, password } = result.data;

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
