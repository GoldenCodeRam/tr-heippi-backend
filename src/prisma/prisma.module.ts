import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { HospitalService } from "./services/hospital/hospital.service";
import { MedicService } from "./services/medic/medic.service";
import { MedicalObservationService } from "./services/medical-observation/medical-observation.service";
import { MedicalServiceService } from "./services/medical-service/medical-service.service";
import { MedicalSpecialtyService } from "./services/medical-specialty/medical-specialty.service";
import { PatientService } from "./services/patient/patient.service";
import { PermissionService } from "./services/permission/permission.service";
import { RoleService } from "./services/role/role.service";
import { UserService } from "./services/user/user.service";
import { UserStatusService } from "./services/user-status/user-status.service";

@Module({
    providers: [
        PrismaService,
        HospitalService,
        MedicService,
        MedicalObservationService,
        MedicalServiceService,
        MedicalSpecialtyService,
        PatientService,
        PermissionService,
        RoleService,
        UserService,
        UserStatusService,
    ],
    exports: [
        UserService,
        UserStatusService,
        HospitalService,
        PatientService,
        MedicService,
    ],
})
export class PrismaModule { }
