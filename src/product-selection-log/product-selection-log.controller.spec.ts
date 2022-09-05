import { Test, TestingModule } from '@nestjs/testing';
import { ProductSelectionLogController } from './product-selection-log.controller';
import { ProductSelectionLogService } from './product-selection-log.service';

describe('ProductSelectionLogController', () => {
  let controller: ProductSelectionLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSelectionLogController],
      providers: [ProductSelectionLogService],
    }).compile();

    controller = module.get<ProductSelectionLogController>(ProductSelectionLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
