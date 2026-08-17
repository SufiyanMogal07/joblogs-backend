import z from "zod";
import { JobSource, JobStatus } from "../../generated/prisma/enums";

export enum SortByType {
  Newest = "newest",
  Oldest = "oldest",
  RecentlyUpdated = "recently_updated",
  CompanyAZ = "company_asc",
  CompanyZA = "company_desc",
  PriorityFirst = "priority_first",
}

type SortOrder = {
  createdAt?: "asc" | "desc";
  updatedAt?: "asc" | "desc";
  companyName?: "asc" | "desc";
  priority?: "asc" | "desc";
};

export const SortByMapping: Record<SortByType, SortOrder> = {
  [SortByType.Newest]: { createdAt: "desc" },
  [SortByType.Oldest]: { createdAt: "asc" },
  [SortByType.RecentlyUpdated]: { updatedAt: "desc" },
  [SortByType.CompanyAZ]: { companyName: "asc" },
  [SortByType.CompanyZA]: { companyName: "desc" },
  [SortByType.PriorityFirst]: { priority: "desc" },
};

export const FrontendSortByType = [
  { value: SortByType.Newest, label: "Newest" },
  { value: SortByType.Oldest, label: "Oldest" },
  { value: SortByType.RecentlyUpdated, label: "Recently Updated" },
  { value: SortByType.PriorityFirst, label: "Priority" },
  { value: SortByType.CompanyAZ, label: "Company A-Z" },
  { value: SortByType.CompanyZA, label: "Company Z-A" },
];


export const JobMetaDataStatus = z.enum(JobStatus);
export const JobMetaDataSource = z.enum(JobSource);