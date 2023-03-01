/*
  Warnings:

  - Added the required column `UserStatusId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "UserStatusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserStatus" (
    "Id" SERIAL NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserConfirmationCode" (
    "Code" TEXT NOT NULL,
    "GenerationDate" TIMESTAMP(3) NOT NULL,
    "ExpirationDate" TIMESTAMP(3) NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "UserConfirmationCode_pkey" PRIMARY KEY ("Code","UserId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_UserStatusId_fkey" FOREIGN KEY ("UserStatusId") REFERENCES "UserStatus"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConfirmationCode" ADD CONSTRAINT "UserConfirmationCode_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
