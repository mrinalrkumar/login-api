import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CouchBaseAdapterModule } from './couch-base-adapter/couch-base-adapter.module';

@Module({
  imports: [AuthModule, UsersModule, CouchBaseAdapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
