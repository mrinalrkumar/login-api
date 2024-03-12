import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FindUserPhoneDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('phone')
  async findPhone(@Body() findUserPhoneDto: FindUserPhoneDto) {
    return this.usersService.findPhone(findUserPhoneDto.phoneNumber);
  }
}
