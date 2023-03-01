import { BadRequestException, Controller, Post, Request } from "@nestjs/common";
import {
    HospitalDto,
    HospitalService,
} from "src/prisma/services/hospital/hospital.service";

@Controller("hospital")
export class HospitalController {
    constructor(private hospitalService: HospitalService) { }

    @Post("create")
    async create(@Request() request: Request) {
        const result = HospitalDto.safeParse(request.body);

        if (result.success) {
            return await this.hospitalService.create(result.data);
        } else {
            // Let Zod handle the object parsing
            throw new BadRequestException(result.error);
        }
    }
}
