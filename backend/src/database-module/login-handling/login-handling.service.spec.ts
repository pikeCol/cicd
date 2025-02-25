import { Test, TestingModule } from '@nestjs/testing';
import { LoginHandlingService } from './login-handling.service';

describe('LoginHandlingService', () => {
  let service: LoginHandlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginHandlingService],
    }).compile();

    service = module.get<LoginHandlingService>(LoginHandlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
