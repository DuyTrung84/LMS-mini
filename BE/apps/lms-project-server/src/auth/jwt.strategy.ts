import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserInfo } from "./UserInfo";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(protected readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET_KEY"),
        });
    }

    async validate(payload: any): Promise<UserInfo> {
        return {
            username: payload.username,
            roles: payload.roles,
        };
    }
}
