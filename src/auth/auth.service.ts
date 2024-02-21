import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  async signIn(createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.usersService.findOne(createAuthDto.userName);
    if( !user){
      return false
    }
    if (!await bcrypt.compare(createAuthDto.password, user?.password)) {
      return false
    }
    const { password, ...result } = user;
    const payload = { sub: user.userId, username: user.username };
    return true
  }
}
