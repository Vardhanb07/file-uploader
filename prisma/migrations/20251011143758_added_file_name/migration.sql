/*
  Warnings:

  - Added the required column `name` to the `UserFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."UserFile" ADD COLUMN     "name" TEXT NOT NULL;
