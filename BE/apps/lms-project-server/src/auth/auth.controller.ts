import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginCredentials } from "./LoginCredentials";
import { UserInfo } from "./UserInfo";

@ApiTags("auth")
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    @ApiOkResponse({ type: UserInfo })
    @ApiBody({ type: LoginCredentials })
    async login(@Body() body: LoginCredentials): Promise<UserInfo> {
        return this.authService.login(body);
    }

    @Post("logout")
    @ApiOkResponse({ type: Boolean })
    async logout(): Promise<boolean> {
        return true;
    }
}
