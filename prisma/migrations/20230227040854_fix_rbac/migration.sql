/*
  Warnings:

  - You are about to drop the `UserRegistry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRolePermission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `UserId` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Medic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RoleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRegistry" DROP CONSTRAINT "UserRegistry_RoleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRegistry" DROP CONSTRAINT "UserRegistry_UserId_fkey";

-- DropForeignKey
ALTER TABLE "UserRolePermission" DROP CONSTRAINT "UserRolePermission_PermissionId_fkey";

-- DropForeignKey
ALTER TABLE "UserRolePermission" DROP CONSTRAINT "UserRolePermission_RoleId_fkey";

-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Medic" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "RoleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserRegistry";

-- DropTable
DROP TABLE "UserRole";

-- DropTable
DROP TABLE "UserRolePermission";

-- CreateTable
CREATE TABLE "Role" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "RoleId" INTEGER NOT NULL,
    "PermissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("RoleId","PermissionId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "Role"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medic" ADD CONSTRAINT "Medic_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "Role"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_PermissionId_fkey" FOREIGN KEY ("PermissionId") REFERENCES "Permission"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
