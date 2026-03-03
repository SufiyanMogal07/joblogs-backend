import z from "zod";
import { JobStatus, JobSource } from "../generated/prisma/client";

export const JobSchema = z.object({
    companyName: z.string().trim().min(3,"Company name is required!"),
    position: z.string().min(3,"Job position is required!"),
    status: z.enum(JobStatus).default(JobStatus.draft),
    source: z.enum(JobSource),
    prioirty: z.boolean().default(false),
    notes: z.string().trim().optional(),
    appliedAt: z.coerce.date().optional().nullable()
});

export type JobInputSchema = z.infer<typeof JobSchema>