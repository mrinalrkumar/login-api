import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CouchBaseAdapterModule } from 'src/couch-base-adapter/couch-base-adapter.module';

@Module({
  imports: [CouchBaseAdapterModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
