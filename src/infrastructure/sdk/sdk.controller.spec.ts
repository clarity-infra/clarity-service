import { Test, TestingModule } from '@nestjs/testing';
import { SDKController } from './sdk.controller';

describe('SDKController', () => {
  let controller: SDKController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SDKController],
    }).compile();

    controller = module.get<SDKController>(SDKController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
