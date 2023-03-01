-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "Id" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Birthdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MedicalService" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "MedicalService_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MedicalSpecialty" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "MedicalSpecialty_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Medic" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "HospitalId" INTEGER NOT NULL,

    CONSTRAINT "Medic_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MedicalObservation" (
    "Id" SERIAL NOT NULL,
    "Observation" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "MedicId" INTEGER NOT NULL,
    "PatientId" INTEGER NOT NULL,

    CONSTRAINT "MedicalObservation_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserRegistry" (
    "UserId" INTEGER NOT NULL,
    "RoleId" INTEGER NOT NULL,

    CONSTRAINT "UserRegistry_pkey" PRIMARY KEY ("UserId","RoleId")
);

-- CreateTable
CREATE TABLE "UserRolePermission" (
    "RoleId" INTEGER NOT NULL,
    "PermissionId" INTEGER NOT NULL,

    CONSTRAINT "UserRolePermission_pkey" PRIMARY KEY ("RoleId","PermissionId")
);

-- CreateTable
CREATE TABLE "HospitalMedicalService" (
    "HospitalId" INTEGER NOT NULL,
    "MedicalServiceId" INTEGER NOT NULL,

    CONSTRAINT "HospitalMedicalService_pkey" PRIMARY KEY ("HospitalId","MedicalServiceId")
);

-- CreateTable
CREATE TABLE "ObservationMedicalSpecialty" (
    "MedicalObservationId" INTEGER NOT NULL,
    "MedicalSpecialtyId" INTEGER NOT NULL,

    CONSTRAINT "ObservationMedicalSpecialty_pkey" PRIMARY KEY ("MedicalObservationId","MedicalSpecialtyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Medic" ADD CONSTRAINT "Medic_HospitalId_fkey" FOREIGN KEY ("HospitalId") REFERENCES "Hospital"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalObservation" ADD CONSTRAINT "MedicalObservation_MedicId_fkey" FOREIGN KEY ("MedicId") REFERENCES "Medic"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalObservation" ADD CONSTRAINT "MedicalObservation_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES "Patient"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRegistry" ADD CONSTRAINT "UserRegistry_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRegistry" ADD CONSTRAINT "UserRegistry_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "UserRole"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolePermission" ADD CONSTRAINT "UserRolePermission_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "UserRole"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolePermission" ADD CONSTRAINT "UserRolePermission_PermissionId_fkey" FOREIGN KEY ("PermissionId") REFERENCES "Permission"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalMedicalService" ADD CONSTRAINT "HospitalMedicalService_HospitalId_fkey" FOREIGN KEY ("HospitalId") REFERENCES "Hospital"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalMedicalService" ADD CONSTRAINT "HospitalMedicalService_MedicalServiceId_fkey" FOREIGN KEY ("MedicalServiceId") REFERENCES "MedicalService"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObservationMedicalSpecialty" ADD CONSTRAINT "ObservationMedicalSpecialty_MedicalObservationId_fkey" FOREIGN KEY ("MedicalObservationId") REFERENCES "MedicalObservation"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObservationMedicalSpecialty" ADD CONSTRAINT "ObservationMedicalSpecialty_MedicalSpecialtyId_fkey" FOREIGN KEY ("MedicalSpecialtyId") REFERENCES "MedicalSpecialty"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
