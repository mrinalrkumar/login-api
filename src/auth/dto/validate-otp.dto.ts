import { IsNotEmpty, IsString } from "class-validator";

export class ValidaeOtpDto {
    @IsString()
    @IsNotEmpty()
    refId: string

    @IsString()
    @IsNotEmpty()
    otp: string
}