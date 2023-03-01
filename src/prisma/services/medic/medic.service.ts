import { BadRequestException, Injectable } from "@nestjs/common";
import { Hospital } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Err, Ok } from "ts-results";
import { z } from "zod";
import { UserDto, UserService } from "../user/user.service";

export const MedicDto = UserDto.extend({
    Name: z.string(),
    Address: z.string(),
});
type MedicDto = z.infer<typeof MedicDto>;

@Injectable()
export class MedicService {
    constructor(
        private prismaService: PrismaService,
        private userService: UserService,
    ) { }

    async create(medicDto: MedicDto, hospital: Hospital) {
        const result = await this.userService.create(medicDto);

        // we need the user to make the hospital user
        if (result.ok) {
            try {
                const medic = await this.prismaService.medic.create({
                    data: {
                        ...medicDto,
                        UserId: result.unwrap().Id,
                        HospitalId: hospital.Id,
                    },
                });

                return Ok(medic);
            } catch (err: any) {
                return Err(new BadRequestException(err));
            }
        }
        return Err(new BadRequestException());
    }
}
