import {
    BadRequestException,
    Controller,
    Get,
    NotAcceptableException,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UserStatusService } from "src/prisma/services/user-status/user-status.service";
import { UserDto, UserPasswordChangeDto, UserService } from "src/prisma/services/user/user.service";
import { CryptoService } from "src/services/crypto/crypto.service";

@Controller("user")
export class UserController {
    constructor(
        private userService: UserService,
        private cryptoService: CryptoService,
        private userStatusService: UserStatusService,
    ) { }

    @Post("create")
    async create(@Request() request: Request) {
        const result = UserDto.safeParse(request.body);

        if (result.success) {
            return await this.userService.create(result.data);
        } else {
            // Let Zod handle the object parsing
            throw new BadRequestException(result.error);
        }
    }

    @Get("activate/:code")
    async activate(@Param("code") code: string) {
        // decipher the user Id for the user authorization table
        const userId = this.cryptoService.decipherUserAuthorizationCode(code);

        const result = await this.userStatusService.activateUser(parseInt(userId));
        if (result.err) {
            throw new NotAcceptableException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch("password/change")
    async changePassword(@Request() request: Request) {
        const result = UserPasswordChangeDto.safeParse(request.body);

        if (result.success) {
        } else {
            throw new BadRequestException(result.error);
        }
    }
}
