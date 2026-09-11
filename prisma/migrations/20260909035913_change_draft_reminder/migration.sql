/*
  Warnings:

  - The values [DRAFT_2_DAYS] on the enum `ReminderType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReminderType_new" AS ENUM ('DRAFT_3_DAYS', 'INACTIVE_30_DAYS', 'GHOST_60_DAYS');
ALTER TABLE "JobReminder" ALTER COLUMN "type" TYPE "ReminderType_new" USING ("type"::text::"ReminderType_new");
ALTER TYPE "ReminderType" RENAME TO "ReminderType_old";
ALTER TYPE "ReminderType_new" RENAME TO "ReminderType";
DROP TYPE "public"."ReminderType_old";
COMMIT;
