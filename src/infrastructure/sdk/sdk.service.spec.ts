import { Test, TestingModule } from '@nestjs/testing';
import { SDKService } from './sdk.service';

describe('SDKService', () => {
  let service: SDKService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SDKService],
    }).compile();

    service = module.get<SDKService>(SDKService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
