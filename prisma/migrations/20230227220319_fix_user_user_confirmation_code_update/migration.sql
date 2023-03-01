/*
  Warnings:

  - The primary key for the `UserConfirmationCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[UserId]` on the table `UserConfirmationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserConfirmationCode" DROP CONSTRAINT "UserConfirmationCode_pkey",
ADD CONSTRAINT "UserConfirmationCode_pkey" PRIMARY KEY ("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserConfirmationCode_UserId_key" ON "UserConfirmationCode"("UserId");
