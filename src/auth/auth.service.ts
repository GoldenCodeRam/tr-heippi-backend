import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { DEFAULT_USER_STATES } from "src/prisma/services/user-status/user-status.service";
import { UserService } from "src/prisma/services/user/user.service";
import { Err, Result } from "ts-results";

export type JwtToken = {
    accessToken: string;
};

export type JwtTokenPayload = {
    userId: number;
    document: string;
};

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(
        document: string,
        password: string,
    ): Promise<Result<User, Error>> {
        const user = await this.userService.findOne(document);

        if (user.ok) {
            if (user.unwrap().UserStatusId != DEFAULT_USER_STATES.ACTIVE) {
                return Err(Error("User not activated"));
            }

            // check the user password
            if (await compare(password, user.unwrap().Password)) {
                return user;
            }
            return Err(Error("Incorrect password"));
        }
        return Err(user.val as Error);
    }

    login(user: User): JwtToken {
        const payload: JwtTokenPayload = {
            userId: user.Id,
            document: user.Document,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
