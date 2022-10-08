import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { MarketModule } from './market/market.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductSelectionLogModule } from './product-selection-log/product-selection-log.module';
import { MarketProductModule } from './market-product/market-product.module';
import { PriceHistoryModule } from './price-history/price-history.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [ClientModule, MarketModule, CategoryModule, ProductModule, ProductSelectionLogModule, MarketProductModule, PriceHistoryModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
