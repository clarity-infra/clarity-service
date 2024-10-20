import { Test, TestingModule } from '@nestjs/testing';
import { ClarezaLoggerService } from './logger.service';

describe('ClarezaLoggerService', () => {
  let service: ClarezaLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClarezaLoggerService],
    }).compile();

    service = module.get<ClarezaLoggerService>(ClarezaLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
