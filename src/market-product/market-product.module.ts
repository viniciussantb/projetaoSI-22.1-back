import { Module } from '@nestjs/common';
import { MarketProductService } from './market-product.service';
import { MarketProductController } from './market-product.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [MarketProductController],
  providers: [MarketProductService],
  imports: [NotificationModule],
})
export class MarketProductModule {}
