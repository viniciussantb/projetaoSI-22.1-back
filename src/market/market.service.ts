import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../app.data-source';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { Market } from './entities/market.entity';

@Injectable()
export class MarketService {
  async create(createMarketDto: CreateMarketDto) {
    return await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Market)
      .values(createMarketDto)
      .execute();
  }

  async findAll() {
    return await AppDataSource
    .createQueryBuilder()
    .select('m')
    .from(Market, 'm')
    .getMany();
  }

  async findOne(id: number) {
    return await AppDataSource
      .createQueryBuilder()
      .select('m')
      .from(Market, 'm')
      .where('m.id=:marketId', { marketId: id })
      .getOne();
  }

  async findByNeighborhood(neighborhood: string) {
    return await AppDataSource
      .createQueryBuilder()
      .select('m')
      .from(Market, 'm')
      .where('m.neighborhood=:marketNeighborhood', { marketNeighborhood: neighborhood })
      .getMany();
  }

  async update(updateMarketDto: UpdateMarketDto) {
    return await AppDataSource
      .createQueryBuilder()
      .update(Market)
      .set(updateMarketDto)
      .where('id=:marketId', { marketId: updateMarketDto.id })
      .execute();
  }

  async remove(id: number) {
    return await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Market)
      .where('id=:marketId', { marketId: id })
      .execute();
  }
}
