import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { MarketModule } from './market/market.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ClientModule, MarketModule, CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
