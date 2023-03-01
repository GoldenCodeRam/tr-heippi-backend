/*
  Warnings:

  - You are about to drop the column `DocumentId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Document]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Document` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DocumentTypeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_DocumentId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "DocumentId",
ADD COLUMN     "Document" TEXT NOT NULL,
ADD COLUMN     "DocumentTypeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Document_key" ON "User"("Document");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_DocumentTypeId_fkey" FOREIGN KEY ("DocumentTypeId") REFERENCES "DocumentType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
