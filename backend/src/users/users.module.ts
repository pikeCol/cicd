import { Module } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { UsersController } from './users.controller';

@Module({
  providers: [RegisterService],
  controllers: [UsersController]
})
export class UsersModule {
}
