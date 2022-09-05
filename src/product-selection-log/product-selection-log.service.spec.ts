import { Test, TestingModule } from '@nestjs/testing';
import { ProductSelectionLogService } from './product-selection-log.service';

describe('ProductSelectionLogService', () => {
  let service: ProductSelectionLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSelectionLogService],
    }).compile();

    service = module.get<ProductSelectionLogService>(ProductSelectionLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
