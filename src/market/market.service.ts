import { Injectable } from '@nestjs/common';
import { MarketProduct } from '../market-product/entities/market-product.entity';
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
    const users = await AppDataSource
    .createQueryBuilder()
    .select('m')
    .from(Market, 'm')
    .getMany();

    const usersDto = users.map(user => {
      const userDto = {
        id: user.id,
        name: user.name,
        ownerName: user.ownerName,
        neighborhood: user.neighborhood,
        email: user.email,
        adNumber: user.adNumber,
        location: user.location,
        cep: user.cep,
      }

      return userDto;
    });

    return usersDto;
  }

  async findOne(id: number) {
    const user = await AppDataSource
      .createQueryBuilder()
      .select('m')
      .from(Market, 'm')
      .where('m.id=:marketId', { marketId: id })
      .getOne();

    const userDto = {
      id: user.id,
      name: user.name,
      ownerName: user.ownerName,
      neighborhood: user.neighborhood,
      email: user.email,
      adNumber: user.adNumber,
      location: user.location,
      cep: user.cep,
    };

    return userDto;
  }

  async findMarketProducts(id: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    const query = `
    SELECT mp.quantity, mp."Price", prod.name
    FROM "marketProduct" mp
    LEFT JOIN product prod ON prod.id = mp."productId"
    WHERE mp."marketId" = $1
    AND mp.active=true
    `;

    const marketProduct = await queryRunner.query(query, [id]);
    queryRunner.release()

    return marketProduct;
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

  async login(email: string, password: string) {
    const user = await AppDataSource
      .createQueryBuilder()
      .select('u')
      .from(Market, 'u')
      .where('u.email=:email', { email })
      .andWhere('u.password=:password', { password })
      .getOne();

    if (!user) return user;

    const userDto = {
      id: user.id,
      name: user.name,
      ownerName: user.ownerName,
      neighborhood: user.neighborhood,
      email: user.email,
      adNumber: user.adNumber,
      location: user.location,
      cep: user.cep,
    }

      return userDto;
  }

  async getNeighborhoods() {
    const queryRunner = AppDataSource.createQueryRunner();
    const query = `
    SELECT DISTINCT market.neighborhood
    FROM market;
    `;

    const neighborhood = await queryRunner.query(query);
    queryRunner.release();
    
    return neighborhood;
  }
}
