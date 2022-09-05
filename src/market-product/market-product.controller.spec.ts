import { Test, TestingModule } from '@nestjs/testing';
import { MarketProductController } from './market-product.controller';
import { MarketProductService } from './market-product.service';

describe('MarketProductController', () => {
  let controller: MarketProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketProductController],
      providers: [MarketProductService],
    }).compile();

    controller = module.get<MarketProductController>(MarketProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
