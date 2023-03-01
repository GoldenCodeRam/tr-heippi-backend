import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { createTransport } from "nodemailer";
import { env } from "process";
import { CryptoService } from "../crypto/crypto.service";

@Injectable()
export class EmailService {
    private transporter = createTransport({
        service: env.EMAIL_SERVICE,
        auth: {
            user: env.EMAIL_TRANSPORTER,
            pass: env.EMAIL_TRANSPORTER_PASSWORD,
        },
    });

    constructor(private cryptoService: CryptoService) { }

    sendUserConfirmationEmail(user: User) {
        this.transporter.sendMail(
            {
                from: env.EMAIL_TRANSPORTER,
                to: user.Email,
                subject: "Welcome to Hosheippi",
                html: `
                The following link will activate your account:
                ${env.USER_CONFIRMATION_CODE_URL
                    }${this.cryptoService.cipherUserAuthorizationCode(user)}
            `,
            },
            (error, info) => {
                console.log(error, info);
            },
        );
    }
}
