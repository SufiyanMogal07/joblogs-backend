/*
  Warnings:

  - Added the required column `jobDescription` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobUrl` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "jobUrl" TEXT NOT NULL;
