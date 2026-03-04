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

export const JobSchema = JobBaseObject
.refine(
  (data) => {
    // Return true to pass and false to fail
    if (data.status !== JobStatus.draft) {
      return !!data.appliedAt;
    }
    return true;
  },
  {
    message: "Date is required unless the job is a draft",
    path: ["appliedAt"],
  },
);

export const JobUpdateSchema = JobSchema.partial();

export type JobInputSchema = z.infer<typeof JobSchema>;
export type JobUpdateInputSchema = z.infer<typeof JobUpdateSchema>;
