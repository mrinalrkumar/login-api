import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { CouchBaseAdapterService } from 'src/couch-base-adapter/couch-base-adapter.service';
import {
  Bucket,
  Cluster,
  Collection,
  DocumentNotFoundError,
  GetResult,
  PasswordAuthenticator,
  QueryResult,
} from 'couchbase';
import { randomUUID } from 'crypto';
import { FindUserPhoneDto } from './dto/update-user.dto';
import * as dayjs from 'dayjs';
import { ValidaeOtpDto } from 'src/auth/dto/validate-otp.dto';

export interface User {
  userId: number;
  username: string;
  password: string;
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the rejection or log it appropriately
});

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];

  // constructor() {

  // }
  constructor(private couchBaseService: CouchBaseAdapterService) {
    this.initializeUsers();
  }

  private collection: Collection;
  private cluster: Cluster;
  private bucket: Bucket;

  async onModuleInit(): Promise<void> {
    this.cluster = await this.couchBaseService.connectDb();
    this.bucket = this.cluster.bucket('data-collection');
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
  
  // async findOne(username: string): Promise<any> {
  //   const query = `SELECT *FROM \`users\` WHERE userName = $userName`;
  //   const options = { parameters: { userName: username } };
  //   const userData: QueryResult = await this.bucket
  //     .scope('database')
  //     .query(query, options);
  //   console.log(userData.rows[0].users);
  //   return userData.rows[0].users;
  // }

  async findPhone(phoneNumber: string): Promise<any> {
    try {
      const collection = this.bucket.scope('database').collection('phone');
      const collectionUser = this.bucket.scope('database').collection('users');
      const result = await collection.get(phoneNumber);
      const userDetails = await collectionUser.get(result.content.refId);
      return userDetails.content;
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 404;
      const message = 'Phone number not found';
      console.error(`Error (${statusCode}): ${message}`);
      throw { statusCode, message };
    }
  }

  async validateOtp(validaeOtpDto: ValidaeOtpDto): Promise<any> {
    // try {
      const collection = this.bucket.scope('database').collection('otp');
      const result = await collection.get(validaeOtpDto.refId);
      console.log(result.content)
      if(result.content.otp === validaeOtpDto.otp && dayjs(result.content.timestamp).add(result.content.expiry, 'minute') > dayjs()){
        return true
      } else {
        const statusCode = 404;
      const message = 'OTP is invalid';
      throw { statusCode, message };
      }
    // } catch (error) {
    //   console.log(error);
    //   const statusCode = error.statusCode || 500;
    //   const message = 'Invalid OTP';
    //   console.error(`Error (${statusCode}): ${message}`);
    //   throw { statusCode, message };
    // }
  }

  async inputOtp(): Promise<any>{
    try{
      const doc_id = randomUUID();
      const otpLength = 6;
      const min = Math.pow(10, otpLength - 1);
      const max = Math.pow(10, otpLength) - 1;
      const otpResult = Math.floor(Math.random() * (max - min + 1)) + min;
      const otp = otpResult.toString();
      await this.bucket.scope('database').collection('otp').upsert(doc_id,{
        otp: otp,
        timestamp: dayjs(),
        expiry: 5
      })
      return {
        refId: doc_id,
        otp: otp
      }
    } catch (error) {
      console.error('Error in OTP:', error);
      throw error; // Rethrow the error for handling in the calling code
    }
  }

  async signUp(createUsersDto: CreateUserDto): Promise<any> {
    try {
      const doc_id = randomUUID();
      const collection = this.bucket.scope('database').collection('users');
      const collectionPhone = this.bucket.scope('database').collection('phone');
      const collectionEmail = this.bucket.scope('database').collection('email');
      const collectionUserName = this.bucket.scope('database').collection('userid');
      const mobileExist = await collectionPhone.get(createUsersDto.mobileNumber)
      if (mobileExist) {
        throw new ConflictException('Mobile number already exists');
      }
  
      // if (await collectionEmail.get(createUsersDto.emailId)) {
      //   throw new ConflictException('Email ID already exists');
      // }
  
      // if (await collectionUserName.get(createUsersDto.userName)) {
      //   throw new ConflictException('User name already exists');
      // }
  
      return "Doc not found in the database"
      // const result = await collection.upsert(doc_id, {
      //   userName: createUsersDto.userName,
      //   password: await bcrypt.hash(createUsersDto.passWord, 10),
      //   employeeId: createUsersDto.employeeId,
      //   emailId: createUsersDto.emailId,
      //   mobileNumber: createUsersDto.mobileNumber,
      //   reportingTo: createUsersDto.reportingTo,
      // });
  
      // console.log('Upsert result:', result);
      // console.log('Document ID:', doc_id);
  
      // if (result) {
      //   return 'success';
      // } else {
      //   return 'error';
      // }
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error; // Rethrow the error for handling in the calling code
    }
  }
}
