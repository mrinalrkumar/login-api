import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ValidaeOtpDto } from './dto/validate-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(createAuthDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(createAuthDto.userName);
    if( !user){
      return false
    }
    if (!await bcrypt.compare(createAuthDto.password, user?.password)) {
      return false
    }
    const { password, ...result } = user;
    const payload = { sub: user.userId, username: user.username };
    return {
      "statusCode": HttpStatus.OK,
      "message": {
        "id": "Success",
        "message": "Login successful"
      },
      "data": {
        //add data here
      } 
    }
  }

  // async signIn(createAuthDto: CreateAuthDto): Promise<any> {
  //   if (createAuthDto.status === 'U') {
  //     console.log(createAuthDto.userDetails);
  //     const user = await this.usersService.findOne(
  //       createAuthDto.userDetails.userName,
  //     );
  //     if (!user) {
  //       return false;
  //     }
  //     console.log(user.password);
  //     console.log(createAuthDto);
  //     if (
  //       !(await bcrypt.compare(
  //         createAuthDto.userDetails.password,
  //         user?.password,
  //       ))
  //     ) {
  //       return false;
  //     }
  //     const { password, ...result } = user;
  //     const payload = { sub: user.userId, username: user.username };
  //     return true;
  //   }
  //   else {
  //     // return "Phone or emails"
  //     const user = await this.usersService.findPhone(
  //       createAuthDto.mobileNumber,
  //     );
  //     console.log(user.dob)
  //     if (!user) {
  //       return false;
  //     } else {
  //       const userOtp = await this.usersService.inputOtp();
  //       console.log(typeof(userOtp.otp))
  //       return userOtp
  //     }
  //   }
  // }

  async validateOtp(validaeOtpDto: ValidaeOtpDto): Promise<any> {
    const validateOtp = await this.usersService.validateOtp(validaeOtpDto);
    if(!validateOtp){
      return false
    }
    return true
  }
}
