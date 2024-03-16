import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserPhoneDto {
    @IsString()
    @IsNotEmpty()
    phoneNumber: string
}
