import z from "zod";

export const notificationSchema = z.object({
    isEnabled: z.boolean().default(false)
})