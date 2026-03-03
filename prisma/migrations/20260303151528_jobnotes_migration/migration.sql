/*
  Warnings:

  - You are about to drop the column `Notes` on the `Jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "Notes",
ADD COLUMN     "notes" TEXT;
