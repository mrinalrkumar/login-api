import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.initializeUsers();
  }

  private async initializeUsers(): Promise<any> {
    this.users = [
      {
        userId: 1,
        username: 'abc',
        password: await bcrypt.hash('abc', 10),
      },
      {
        userId: 2,
        username: 'abcd',
        password: await bcrypt.hash('abcd', 10),
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
