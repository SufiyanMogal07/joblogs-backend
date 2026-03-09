import z from "zod";
import { JobStatus, JobSource } from "../generated/prisma/client";

const JobBaseObject = z.object({
  companyName: z.string().trim().min(3, "Company name is required!"),
  position: z.string().min(3, "Job position is required!"),
  status: z.enum(JobStatus).default(JobStatus.draft),
  source: z.enum(JobSource),
  priority: z.boolean().default(false),
  notes: z.string().trim().optional(),
  appliedAt: z.coerce.date().optional().nullable(),
});

export const JobSchema = JobBaseObject.superRefine((data, ctx) => {
  if(data.status)
  if (data.status !== JobStatus.draft && !data.appliedAt) {
    ctx.addIssue({
      code: "custom",
      message: "Applied Date is required when the job status is not draft",
      path: ["appliedAt"],
    });
  }
});

export const JobUpdateSchema = JobBaseObject.extend({id: z.number()});

export type JobCreateInput = z.infer<typeof JobSchema>;
export type JobUpdateInput= z.infer<typeof JobUpdateSchema>;
