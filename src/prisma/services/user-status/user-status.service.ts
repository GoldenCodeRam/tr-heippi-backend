import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Err, Ok, Result } from "ts-results";

export const DEFAULT_USER_STATES: { [key: string]: number } = {
    ACTIVE: 1,
    PENDING_CONFIRMATION: 2,
} as const;

@Injectable()
export class UserStatusService implements OnModuleInit {
    constructor(private prismaService: PrismaService) { }

    async onModuleInit() {
        // Init all the default user statuses, as we need them for basic user
        // functionality.
        for (const key in DEFAULT_USER_STATES) {
            await this.prismaService.userStatus.upsert({
                where: {
                    Id: DEFAULT_USER_STATES[key],
                },
                update: {
                    Status: key,
                },
                create: {
                    Status: key,
                },
            });
        }
    }

    async activateUser(userId: number): Promise<Result<boolean, Error>> {
        try {
            // first, change the user status.
            await this.prismaService.user.update({
                where: {
                    Id: userId,
                },
                data: {
                    UserStatusId: DEFAULT_USER_STATES.ACTIVE,
                },
            });

            // then, remove the user activation code
            await this.prismaService.userConfirmationCode.delete({
                where: {
                    UserId: userId,
                },
            });

            return Ok(true);
        } catch (err: any) {
            return Err(err);
        }
    }
}
