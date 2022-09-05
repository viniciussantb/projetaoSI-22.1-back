import { Module } from '@nestjs/common';
import { MarketProductService } from './market-product.service';
import { MarketProductController } from './market-product.controller';

@Module({
  controllers: [MarketProductController],
  providers: [MarketProductService]
})
export class MarketProductModule {}
