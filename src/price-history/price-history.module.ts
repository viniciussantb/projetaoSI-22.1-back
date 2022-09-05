import { Module } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { PriceHistoryController } from './price-history.controller';

@Module({
  controllers: [PriceHistoryController],
  providers: [PriceHistoryService]
})
export class PriceHistoryModule {}
