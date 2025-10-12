/*
  Warnings:

  - You are about to drop the `UserFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserFile" DROP CONSTRAINT "UserFile_userId_fkey";

-- DropTable
DROP TABLE "public"."UserFile";

-- CreateTable
CREATE TABLE "public"."userfiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userfiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."userfiles" ADD CONSTRAINT "userfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
