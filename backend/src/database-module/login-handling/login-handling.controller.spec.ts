import { Test, TestingModule } from '@nestjs/testing';
import { LoginHandlingController } from './login-handling.controller';
import { LoginHandlingService } from './login-handling.service';

describe('LoginHandlingController', () => {
  let controller: LoginHandlingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginHandlingController],
      providers: [LoginHandlingService],
    }).compile();

    controller = module.get<LoginHandlingController>(LoginHandlingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
