/*
  Warnings:

  - Made the column `anonymousId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "anonymousId" SET NOT NULL;
