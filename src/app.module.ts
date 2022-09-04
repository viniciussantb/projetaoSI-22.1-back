import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { MarketModule } from './market/market.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ClientModule, MarketModule, CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
