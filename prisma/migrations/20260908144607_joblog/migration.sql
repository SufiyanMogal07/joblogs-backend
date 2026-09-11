-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('draft', 'applied', 'interviewing', 'onhold', 'offer', 'rejected', 'ghosted');

-- CreateEnum
CREATE TYPE "JobSource" AS ENUM ('linkedin', 'indeed', 'company_website', 'referral', 'cold_call', 'cold_email', 'other');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('DRAFT_2_DAYS', 'INACTIVE_30_DAYS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailNotification" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'draft',
    "source" "JobSource" NOT NULL DEFAULT 'other',
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "jobDescription" TEXT,
    "notes" TEXT,
    "jobUrl" TEXT,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobReminder" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "type" "ReminderType" NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobReminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTimeline" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "fromStatus" "JobStatus",
    "toStatus" "JobStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Job_userId_idx" ON "Job"("userId");

-- CreateIndex
CREATE INDEX "JobReminder_jobId_type_idx" ON "JobReminder"("jobId", "type");

-- CreateIndex
CREATE INDEX "JobTimeline_jobId_idx" ON "JobTimeline"("jobId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobReminder" ADD CONSTRAINT "JobReminder_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTimeline" ADD CONSTRAINT "JobTimeline_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
