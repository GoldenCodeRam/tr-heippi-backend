import { BadRequestException, Injectable } from "@nestjs/common";
import { Hospital } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Err, Ok, Result } from "ts-results";
import { z } from "zod";
import { UserDto, UserService } from "../user/user.service";

export const HospitalDto = UserDto.extend({
    Name: z.string(),
    Address: z.string(),
});

type HospitalDto = z.infer<typeof HospitalDto>;

@Injectable()
export class HospitalService {
    constructor(
        private prismaService: PrismaService,
        private userService: UserService,
    ) { }

    async create(hospitalDto: HospitalDto): Promise<Result<Hospital, Error>> {
        const result = await this.userService.create(hospitalDto);

        // we need the user to make the hospital user
        if (result.ok) {
            try {
                const hospital = await this.prismaService.hospital.create({
                    data: {
                        ...hospitalDto,
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
