import { Test, TestingModule } from '@nestjs/testing';
import { PriceHistoryController } from './price-history.controller';
import { PriceHistoryService } from './price-history.service';

describe('PriceHistoryController', () => {
  let controller: PriceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceHistoryController],
      providers: [PriceHistoryService],
    }).compile();

    controller = module.get<PriceHistoryController>(PriceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
