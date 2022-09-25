import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../app.data-source';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';
import { PriceHistory } from './entities/price-history.entity';
import { checkIfMarketProductExists } from '../utils/checkIfEntityExists';

@Injectable()
export class PriceHistoryService {

  async create(createPriceHistoryDto: CreatePriceHistoryDto) {
    const marketProduct = await checkIfMarketProductExists(createPriceHistoryDto.marketProductId);

    if (!marketProduct) return 'Error to insert PriceHistory. MarketProduct does not exist.';

    const priceHistory = new PriceHistory()
    priceHistory.marketProduct = marketProduct;
    priceHistory.price = createPriceHistoryDto.price;
    
    return await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(PriceHistory)
    .values(priceHistory)
    .execute();
  }

  async findAll() {
    return await AppDataSource
    .createQueryBuilder()
    .select('ph')
    .from(PriceHistory, 'ph')
    .getMany();
  }

  async findOne(id: number) {
    return await AppDataSource
      .createQueryBuilder()
      .select('ph')
      .from(PriceHistory, 'ph')
      .where('ph.id=:priceHistoryId', { priceHistoryId: id })
      .getOne();
  }

  async update(updatePriceHistoryDto: UpdatePriceHistoryDto) {
    const marketProduct = await checkIfMarketProductExists(updatePriceHistoryDto.marketProductId);

    if (!marketProduct) return 'Error to update PriceHistory. MarketProduct does not exist.';

    const priceHistory = new PriceHistory()
    priceHistory.id = updatePriceHistoryDto.id;
    priceHistory.marketProduct = marketProduct;
    priceHistory.price = updatePriceHistoryDto.price;

    return await AppDataSource
    .createQueryBuilder()
    .update(PriceHistory)
    .set(priceHistory)
    .where('id=:priceHistoryId', { priceHistoryId: updatePriceHistoryDto.id })
    .execute();
  }

  async remove(id: number) {
    return AppDataSource
    .createQueryBuilder()
    .delete()
    .from(PriceHistory)
    .where('id=:priceHistoryId', { priceHistoryId: id })
    .execute();
  }
}
