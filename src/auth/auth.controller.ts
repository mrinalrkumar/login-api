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
  async create(@Body() createAuthDto: LoginDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('validateOtp')
  async validateOtp(@Body() validaeOtpDto: ValidaeOtpDto) {
    return this.authService.validateOtp(validaeOtpDto);
  }
}
