import { Module } from '@nestjs/common';
import { ProductSelectionLogService } from './product-selection-log.service';
import { ProductSelectionLogController } from './product-selection-log.controller';

@Module({
  controllers: [ProductSelectionLogController],
  providers: [ProductSelectionLogService]
})
export class ProductSelectionLogModule {}
