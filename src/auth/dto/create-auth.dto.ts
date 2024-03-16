import { IsDefined, IsEnum, IsNotEmpty, IsString, Validate, ValidateIf, ValidateNested } from "class-validator";

enum AuthType {
    M = 'M',
    E = 'E',
    U = 'U'
}

class UserLoginDto{
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
export class CreateAuthDto {

    @IsEnum(AuthType)
    status: AuthType;
    
    @IsString()
    @ValidateIf((object) => object.status === 'M')
    @IsNotEmpty()
    @IsDefined()
    mobileNumber: string;

    @IsString()
    @ValidateIf((object) => object.status === 'E')
    @IsNotEmpty()
    emailId: string;

    @ValidateIf((object) => object.status === 'U')
    @ValidateNested()
    userDetails?: UserLoginDto;
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    userName: string;
 
    @IsString()
    @IsNotEmpty()
    password: string;
}
