import { Injectable } from '@nestjs/common';
import { CreateMarketProductDto } from './dto/create-market-product.dto';
import { UpdateMarketProductDto } from './dto/update-market-product.dto';
import { checkIfMarketExists, checkIfProductExists } from 'src/utils/checkIfEntityExists';
import { MarketProduct } from './entities/market-product.entity';
import { AppController } from 'src/app.controller';
import { AppDataSource } from 'src/app.data-source';

@Injectable()
export class MarketProductService {
  async create(createMarketProductDto: CreateMarketProductDto) {
    const product = await checkIfProductExists(createMarketProductDto.productId);
    const market = await checkIfMarketExists(createMarketProductDto.marketId);

    if (!product || !market) {
      return 'Error to insert MarketProduct. Product or Markert does not exist.'
    }

    const marketProduct = new MarketProduct()
    marketProduct.market = market;
    marketProduct.product = product;
    marketProduct.active = createMarketProductDto.active;
    marketProduct.boosted = createMarketProductDto.boosted;
    marketProduct.quantity = createMarketProductDto.quantity;
    marketProduct.price = createMarketProductDto.price;

    return await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(MarketProduct)
    .values(marketProduct)
    .execute();
  }

  async findAll() {
    return await AppDataSource
    .createQueryBuilder()
    .select('mp')
    .from(MarketProduct, 'mp')
    .getMany();
  }

  async findOne(id: number) {
    return await AppDataSource
    .createQueryBuilder()
    .select('mp')
    .from(MarketProduct, 'mp')
    .where('mp.id=:marketProductId', { marketProductId: id })
    .getOne()
  }

  async update(updateMarketProductDto: UpdateMarketProductDto) {
    const product = await checkIfProductExists(updateMarketProductDto.productId);
    const market = await checkIfMarketExists(updateMarketProductDto.marketId);

    if (!product || !market) {
      return 'Error to uptade MarketProduct. Product or Markert does not exist.'
    }

    const marketProduct = new MarketProduct()
    marketProduct.market = market;
    marketProduct.product = product;
    marketProduct.active = updateMarketProductDto.active;
    marketProduct.boosted = updateMarketProductDto.boosted;
    marketProduct.quantity = updateMarketProductDto.quantity;
    marketProduct.price = updateMarketProductDto.price;

    return await AppDataSource
    .createQueryBuilder()
    .update(MarketProduct)
    .set(marketProduct)
    .where('id=:marketProductId', { marketProductId: updateMarketProductDto.id })
    .execute();
  }

  async remove(id: number) {
    return await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(MarketProduct)
    .where('id=:marketProductId', { marketProductId: id })
    .execute()
  }
}
