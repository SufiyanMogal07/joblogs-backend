import z from "zod";
import { JobStatus, JobSource } from "../generated/prisma/client";

const JobBaseObject = z.object({
  companyName: z.string().trim().min(3, "Company name is required!"),
  position: z.string().min(3, "Job position is required!"),
  jobUrl: z
    .string()
    .min(6, "Job URL must be at least 6 characters.")
    .max(100, "Job URL cannot exceed 100 characters."),
  jobDescription: z
    .string()
    .min(50, "Job description must be at least 50 characters.")
    .max(5000, "Job description cannot exceed 5000 characters."),
  status: z.enum(JobStatus).default(JobStatus.draft),
  source: z.enum(JobSource),
  priority: z.boolean().default(false),
  notes: z.string().trim().optional(),
  appliedAt: z.coerce.date().optional().nullable(),
});

export const JobSchema = JobBaseObject.superRefine((data, ctx) => {
  if (data.status)
    if (data.status !== JobStatus.draft && !data.appliedAt) {
      ctx.addIssue({
        code: "custom",
        message: "Applied Date is required when the job status is not draft",
        path: ["appliedAt"],
      });
    }
});

export const JobUpdateSchema = JobBaseObject.extend({ id: z.number() });

export type JobCreateInput = z.infer<typeof JobSchema>;
export type JobUpdateInput = z.infer<typeof JobUpdateSchema>;
