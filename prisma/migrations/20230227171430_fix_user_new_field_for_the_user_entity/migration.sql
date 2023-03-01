/*
  Warnings:

  - Added the required column `DocumentId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "DocumentId" INTEGER NOT NULL,
ALTER COLUMN "Id" DROP DEFAULT;
DROP SEQUENCE "User_Id_seq";

-- CreateTable
CREATE TABLE "DocumentType" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_Name_key" ON "DocumentType"("Name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_DocumentId_fkey" FOREIGN KEY ("DocumentId") REFERENCES "DocumentType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
