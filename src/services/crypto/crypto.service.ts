import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { AES, enc } from 'crypto-js';

// This is VERY interesting, we need this secret, but I don't know yet where to
// store this. So it will stay here for now.
const EMAIL_CONFIRMATION_SECRET = "heippi";

@Injectable()
export class CryptoService {

    async hashUserPassword(plainPassword: string) {
        // This should be changed in the future, as the hash is always using
        // 10 rounds
        return await hash(plainPassword, 10);
    }

    cipherUserAuthorizationCode(user: User): string {
        // Why rabbit? Heh... *smirks
        // You'll never know...
        const cipher = AES.encrypt(user.Id.toString(), EMAIL_CONFIRMATION_SECRET).toString();
        return Buffer.from(cipher).toString("base64url");
    }

    decipherUserAuthorizationCode(code: string): string {
        const decodedCode = Buffer.from(code, "base64url").toString("ascii");
        return AES.decrypt(decodedCode, EMAIL_CONFIRMATION_SECRET).toString(enc.Utf8);
    }
}
