import z from "zod"

export const UserProfileSchema = z.object({
  name: z.string().trim().min(3, "Full name is required"),
  email: z.email().trim().min(4, "Email is required"),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;