import { Injectable } from '@nestjs/common';
import { CreateMarketProductDto } from './dto/create-market-product.dto';
import { UpdateMarketProductDto } from './dto/update-market-product.dto';
import { checkIfMarketExists, checkIfProductExists } from '../utils/checkIfEntityExists';
import { MarketProduct } from './entities/market-product.entity';
import { AppDataSource } from '../app.data-source';
import { ProductSelectionLog } from '../product-selection-log/entities/product-selection-log.entity';
import { Category } from '../category/entities/category.entity';
import { checkIfClientExists } from '../utils/checkIfEntityExists';

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
    .leftJoinAndSelect('mp.market', 'm')
    .leftJoinAndSelect('mp.product', 'p')
    .getMany();
  }

  async findAllFiltered(
    neighborhood: string, 
    categories: string[] | undefined,
    clientId: number | undefined
    ) {
      let marketProducts: MarketProduct[] | undefined | any;
      if (neighborhood && !categories) {
        marketProducts = await AppDataSource
        .createQueryBuilder()
        .select('mp')
        .from(MarketProduct, 'mp')
        .where('mp.neighborhood=:neighborhood', { neighborhood })
        .orderBy('mp.boosted=:true')
        .getMany();

      } else if (categories) {
        let queryRunner = AppDataSource.createQueryRunner();
        let query =
        `
        SELECT pc."productId"
        FROM "productCategory" pc
        LEFT JOIN "category" ca ON pc."categoryId" = ca.id
        LEFT JOIN "product" pr ON pc."productId" = pr.id
        WHERE ca.name = ANY($1::varchar[]);
        ` ;
        const result = await queryRunner.query(query, [categories]);
        await queryRunner.release();
        const productIds: number[] = [];

        result.forEach(productId => {
          productIds.push(productId.productId);
        });

        queryRunner = AppDataSource.createQueryRunner();
        if (neighborhood) {
          query = 
          `
          SELECT 
            mp.id, mp.quantity, mp."Price", mp.boosted, mp.active, mp."marketId", mp."productId",
            pr.name as "productName", pr.description as "productDescripton", pr."imageUrl",
            mar.name as "marketName", mar.email as "marketEmail", mar.neighborhood, mar.cep
          FROM "marketProduct" mp
          LEFT JOIN "market" mar ON mp."marketId" = mar.id
          LEFT JOIN "product" pr ON mp."productId" = pr.id
          WHERE mp."productId" = ANY($1)
          AND mar.neighborhood = $2
          ORDER BY mp.boosted = false;
          `;
          marketProducts = await queryRunner.query(query, [productIds, neighborhood]);

          if (clientId) {
            categories.forEach(async categoryName => {
              const category = await AppDataSource
              .createQueryBuilder()
              .select('c')
              .from(Category, 'c')
              .where('c.name=:categoryName', { categoryName })
              .getOne();

              const client = await checkIfClientExists(clientId);
              
              if (category && client) {
                const log = new ProductSelectionLog();
                log.category = category;
                log.client = client;
                log.neighborhood = neighborhood;
                
                await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(ProductSelectionLog)
                .values(log)
                .execute();
              }

            })
          }

        } else {
          query =
          `
          SELECT 
            mp.id, mp.quantity, mp."Price", mp.boosted, mp.active, mp."marketId", mp."productId",
            pr.name as "productName", pr.description as "productDescripton", pr."imageUrl",
            mar.name as "marketName", mar.email as "marketEmail", mar.neighborhood, mar.cep
          FROM "marketProduct" mp
          LEFT JOIN "market" mar ON mp."marketId" = mar.id
          LEFT JOIN "product" pr ON mp."productId" = pr.id
          WHERE mp."productId" = ANY($1)
          ORDER BY mp.boosted = false;
          `;
          marketProducts = await queryRunner.query(query, [productIds]);
        }
        await queryRunner.release();
      }


      return marketProducts;
  }

  async findOne(id: number) {
    return await AppDataSource
    .createQueryBuilder()
    .select('mp')
    .from(MarketProduct, 'mp')
    .leftJoinAndSelect('mp.market', 'm')
    .leftJoinAndSelect('mp.product', 'p')
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
