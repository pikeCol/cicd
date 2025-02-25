import { Module } from '@nestjs/common';
import { LoginHandlingService } from './login-handling.service';
import { LoginHandlingController } from './login-handling.controller';

@Module({
  controllers: [LoginHandlingController],
  providers: [LoginHandlingService],
})
export class LoginHandlingModule {}
