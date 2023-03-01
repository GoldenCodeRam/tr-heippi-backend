import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(AuthGuard("local"))
    @Post("auth/login")
    async login(@Request() request: Request) { 
        // this request as any is disgusting, but the request with the guard
        // has that field.
        return this.authService.login((request as any).user);
    }
}
