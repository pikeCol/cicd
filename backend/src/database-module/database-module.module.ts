import { Module } from '@nestjs/common';
import { LoginHandlingModule } from './login-handling/login-handling.module';

@Module({
  imports: [LoginHandlingModule]
})
export class DatabaseModuleModule {}
