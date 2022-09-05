import { Test, TestingModule } from '@nestjs/testing';
import { PriceHistoryService } from './price-history.service';

describe('PriceHistoryService', () => {
  let service: PriceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceHistoryService],
    }).compile();

    service = module.get<PriceHistoryService>(PriceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
