import { z } from "zod";


export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name should be atleast of 3 characters!")
    .max(40, "Name should not exceed 40 characters!"),
  email: z
    .string()
    .trim()
    .email("Invalid email address!")
    .max(50, "Email should not exceed 50 characters!"),
  password: z.string().min(6).max(15),
});

export const loginSchema = registerSchema.omit({name: true})

export type registerInputSchema = z.infer<typeof registerSchema>;
export type loginInputSchema = z.infer<typeof loginSchema>

