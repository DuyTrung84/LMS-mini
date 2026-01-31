import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class LoginCredentials {
    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsString()
    password!: string;
}
