import { Test, TestingModule } from '@nestjs/testing';
import { MarketProductService } from './market-product.service';

describe('MarketProductService', () => {
  let service: MarketProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketProductService],
    }).compile();

    service = module.get<MarketProductService>(MarketProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
