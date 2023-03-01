import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { DateTime } from "luxon";
import { PrismaService } from "src/prisma/prisma.service";
import { CryptoService } from "src/services/crypto/crypto.service";
import { EmailService } from "src/services/email/email.service";
import { Err, Ok, Result } from "ts-results";
import { z } from "zod";

import { DEFAULT_USER_STATES } from "../user-status/user-status.service";

export const UserDto = z.object({
    Email: z.string(),
    Phone: z.string(),
    Password: z.string(),
    Document: z.string(),

    RoleId: z.number(),
    DocumentTypeId: z.number(),
});
type UserDto = z.infer<typeof UserDto>;

export const UserPasswordChangeDto = z.object({
    OldPassword: z.string(),
    NewPassword: z.string(),
});
type UserPasswordChangeDto = z.infer<typeof UserPasswordChangeDto>;

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private emailService: EmailService,
        private cryptoService: CryptoService,
    ) { }

    async findOne(
        document: string,
    ): Promise<Result<User, Prisma.PrismaClientKnownRequestError>> {
        try {
            return Ok(
                await this.prismaService.user.findUniqueOrThrow({
                    where: {
                        Document: document,
                    },
                }),
            );
        } catch (e: any) {
            return Err(e);
        }
    }

    async create(userDto: UserDto): Promise<Result<User, Error>> {
        try {
            // This should be changed in the future, as the hash is always using
            // 10 rounds
            userDto.Password = await this.cryptoService.hashUserPassword(
                userDto.Password,
            );

            // the default user status is pending confirmation
            const user = await this.prismaService.user.create({
                data: {
                    ...userDto,
                    UserStatusId: DEFAULT_USER_STATES.PENDING_CONFIRMATION,
                },
            });

            // After the user has been created, send the user confirmation email
            //
            // XXX: This should not be here, as this method is considered to be
            // having a side effect.
            await this.prismaService.userConfirmationCode.create({
                data: {
                    UserId: user.Id,
                    // This is very important I'm using the Luxon library for
                    // this. It means that the code will be valid 1 day after
                    // its generation.
                    GenerationDate: DateTime.now().toJSDate(),
                    ExpirationDate: DateTime.now().plus({ days: 1 }).toJSDate(),
                },
            });
            this.emailService.sendUserConfirmationEmail(user);

            return Ok(user);
        } catch (e: any) {
            return Err(e);
        }
    }
}
