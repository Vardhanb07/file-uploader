/*
  Warnings:

  - Added the required column `type` to the `userfiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."userfiles" ADD COLUMN     "type" TEXT NOT NULL;
