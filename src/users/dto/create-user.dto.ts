import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string

    @IsString()
    @IsNotEmpty()
    passWord: string

    @IsString()
    @IsNotEmpty()
    employeeId: string

    @IsString()
    @IsNotEmpty()
    emailId: string

    @IsString()
    @IsNotEmpty()
    mobileNumber: string

    @IsString()
    @IsNotEmpty()
    reportingTo: string
}