import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { LoginCredentials } from "./LoginCredentials";
import { UserInfo } from "./UserInfo";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<UserInfo> {
        const user = await this.userService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return {
                username: user.username,
                roles: user.roles as string[],
            };
        }
        throw new UnauthorizedException();
    }

    async login(credentials: LoginCredentials): Promise<UserInfo> {
        const user = await this.validateUser(
            credentials.email,
            credentials.password
        );
        const accessToken = this.jwtService.sign({
            username: user.username,
            roles: user.roles,
        });
        return {
            ...user,
            accessToken,
        };
    }
}
