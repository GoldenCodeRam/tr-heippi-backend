import { BadRequestException, Injectable } from "@nestjs/common";
import { Patient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Err, Ok, Result } from "ts-results";
import { z } from "zod";
import { UserDto, UserService } from "../user/user.service";

export const PatientDto = UserDto.extend({
    FirstName: z.string(),
    LastName: z.string(),
    Address: z.string(),
    Birthdate: z.date(),
});
type PatientDto = z.infer<typeof PatientDto>;

@Injectable()
export class PatientService {
    constructor(
        private prismaService: PrismaService,
        private userService: UserService,
    ) { }

    async create(patientDto: PatientDto): Promise<Result<Patient, Error>> {
        const result = await this.userService.create(patientDto);

        // we need the user to make the patient user
        if (result.ok) {
            try {
                const hospital = await this.prismaService.patient.create({
                    data: {
                        ...patientDto,
                        UserId: result.unwrap().Id,
                    },
                });

                return Ok(hospital);
            } catch (err: any) {
                return Err(new BadRequestException(err));
            }
        }
        return Err(new BadRequestException());
    }
}
