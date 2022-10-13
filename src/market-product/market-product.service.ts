import { Injectable } from '@nestjs/common';
import { CreateMarketProductDto } from './dto/create-market-product.dto';
import { UpdateMarketProductDto } from './dto/update-market-product.dto';
import { checkIfMarketExists, checkIfProductExists } from '../utils/checkIfEntityExists';
import { MarketProduct } from './entities/market-product.entity';
import { AppDataSource } from '../app.data-source';
import { ProductSelectionLog } from '../product-selection-log/entities/product-selection-log.entity';
import { Category } from '../category/entities/category.entity';
import { checkIfClientExists } from '../utils/checkIfEntityExists';
import { Market } from '../market/entities/market.entity';
import { MarketNotification } from '../notification/entities/marketNotification.enitity';
import { ClientNotification } from '../notification/entities/clientNotification.entity';
import { Client } from '../client/entities/client.entity';
import { CreateClientNotificationDto } from 'src/notification/dto/client-notification.dto';

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

  async countProductLogs(categoryName: string, neighborhood: string) {
    const queryRunner = AppDataSource.createQueryRunner();

    const query =
    `
    SELECT COUNT(*)
    FROM "productSelectionLog" product_log
    LEFT JOIN category cat ON cat.id = product_log."categoryId"
    WHERE LOWER(cat.name) = LOWER($1)
    AND LOWER(product_log.neighborhood) = LOWER($2)
    AND product_log."createdAt" < NOW() + INTERVAL '7 day';
    `

    const countProductLogs = await queryRunner.query(query, [categoryName, neighborhood]);

    await queryRunner.release();

    return countProductLogs;
  }

  async createClientsAlert(category: Category, neighborhood: string) {
    const queryRunner = AppDataSource.createQueryRunner();
    const query =
      `
      SELECT DISTINCT client.name, client.email
      FROM "productSelectionLog" prod_log
      LEFT JOIN client ON client.id = prod_log."clientId"
      LEFT JOIN category ON category.id = prod_log."categoryId"
      WHERE category.name = $1
      AND prod_log.neighborhood = $2
      AND client."receiveEmail" = true
      `;

    const activeClients = await queryRunner.query(query, [category.name, neighborhood]);

    activeClients.forEach(async client => {
      const activeClient = await AppDataSource.createQueryBuilder()
        .select('c')
        .from(Client, 'c')
        .where('c.name=:clientName', { cilentName: client.name })
        .andWhere('c.email=:clientEmail', { clientEmail: client.email })
        .getOne();

      const clientNotification = new ClientNotification();
      clientNotification.active = true;
      clientNotification.category = category;
      clientNotification.neighborhood = neighborhood;
      clientNotification.client = activeClient;
      
      await AppDataSource.createQueryBuilder()
        .insert()
        .into(ClientNotification)
        .values(clientNotification)
        .execute();
    });
  }

  async sendNotificationToClient(
      neighborhood: string,
      category: string,
      marketProduct: MarketProduct
    ) {
    const queryRunner = AppDataSource.createQueryRunner();
    const query =
    `
    SELECT DISTINCT client.name, client.email
    FROM "clientNotification" client_notif
    LEFT JOIN client ON client.id = client_notif."clientId"
    LEFT JOIN category cat ON cat.id = client_notif."categoryId"
    WHERE cat.name = $1
    AND client_notif.neighborhood = $2
    AND client_notif."createdAt" < NOW() + INTERVAL '1 day'
    `;

    const alertClientsNotification = await queryRunner.query(query, [category, neighborhood]);

    console.log('alertClientsNotification: ', alertClientsNotification);
  }

  async sendNotificationToMarket(neighborhood: string) {
    const markets = await AppDataSource
      .createQueryBuilder()
      .select(['m.email', 'm.ownerName'])
      .from(Market, 'm')
      .where('m.neighborhood=:neighborhood', { neighborhood })
      .getMany();
  }

  async verifyMarketNotification(categoryName: string, neighborhood: string) {
    const queryRunner = AppDataSource.createQueryRunner();

    const query =
    `
    SELECT m_not.active, m_not."createdAt"
    FROM "marketNotification" m_not
    LEFT JOIN category cat ON cat.id = m_not."categoryId"
   	WHERE m_not.neighborhood = $1
    AND cat.name = $2
    AND m_not."createdAt" > NOW() + INTERVAL '1 day'
    ORDER BY m_not."createdAt" DESC
    LIMIT 1
    ` ;

    const notificationSent = await queryRunner.query(query, [neighborhood, categoryName]);
    queryRunner.release();

    if(notificationSent.length > 0) {
      return
    }

    const countProductLogs = await this.countProductLogs(categoryName, neighborhood);
    if (+countProductLogs[0].count > 4) {
      this.sendNotificationToMarket(neighborhood);

      const category = await AppDataSource.createQueryBuilder()
        .select('c')
        .from(Category, 'c')
        .where('c.name=:categoryName', { categoryName })
        .getOne();

      const marketNotification = new MarketNotification();
      marketNotification.active = true;
      marketNotification.category = category
      marketNotification.neighborhood = neighborhood;

      await AppDataSource.createQueryBuilder()
        .insert()
        .into(MarketNotification)
        .values(marketNotification)
        .execute();
    }
  }

  async createProductSelectionLog(clientId: number, categoryName: string, neighborhood: string) {
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

    this.verifyMarketNotification(categoryName, neighborhood);
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
        let query;
        if (Array.isArray(categories)) {
          query =
          `
          SELECT pc."productId"
          FROM "productCategory" pc
          LEFT JOIN "category" ca ON pc."categoryId" = ca.id
          LEFT JOIN "product" pr ON pc."productId" = pr.id
          WHERE ca.name = ANY($1::character varying[]);
          ` ;
        } else {
          query =
          `
          SELECT pc."productId"
          FROM "productCategory" pc
          LEFT JOIN "category" ca ON pc."categoryId" = ca.id
          LEFT JOIN "product" pr ON pc."productId" = pr.id
          WHERE ca.name = $1;
          ` ;
        }
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
          WHERE mp."productId" = ANY($1::integer[])
          AND mar.neighborhood = $2
          ORDER BY mp.boosted = false;
          `;
          marketProducts = await queryRunner.query(query, [productIds, neighborhood]);

          if (clientId) {
            if (Array.isArray(categories)) {              
              categories.forEach(async categoryName => {
                await this.createProductSelectionLog(clientId, categoryName, neighborhood);
              });
            } else {
              await this.createProductSelectionLog(clientId, categories, neighborhood)
            }
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
