import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { validate } from 'class-validator';
import { ValidaeOtpDto } from './dto/validate-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
<<<<<<< HEAD
  async create(@Body() createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);
=======
  async create(@Body() createAuthDto: LoginDto) {
>>>>>>> eb7908719ba95ee5a3f8847e021fc24ad8786336
    return this.authService.signIn(createAuthDto);
  }

  @Post('validateOtp')
  async validateOtp(@Body() validaeOtpDto: ValidaeOtpDto) {
    return this.authService.validateOtp(validaeOtpDto);
  }
}
