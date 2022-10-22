import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AppDataSource } from '../app.data-source';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductCategory } from './entities/productCategory.entity';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { checkIfProductExists, checkIfCategoryExists, checkIfMarketExists } from '../utils/checkIfEntityExists';
import { MarketProduct } from '../market-product/entities/market-product.entity';
import { NotificationDto } from '../notification/dto/notification.dto';
import { NotificationService } from '../notification/notification.service';
import { Market } from '../market/entities/market.entity';

@Injectable()
export class ProductService {
  constructor(private readonly notificationService: NotificationService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {

    try {
      const product = new Product();
      product.name = createProductDto.name;
      product.description = createProductDto.description;
      product.imageUrl = createProductDto.imageUrl;

      
      await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(product)
      .execute();

      let market: Market;
      let marketProduct: MarketProduct;

      if (createProductDto.marketId) {
        market = await checkIfMarketExists(createProductDto.marketId);
        marketProduct = new MarketProduct();
        marketProduct.market = market;
        marketProduct.active = true;
        marketProduct.price = createProductDto.price;
        marketProduct.product = product;
        marketProduct.quantity = createProductDto.quantity;
        marketProduct.boosted = true;


        await AppDataSource.createQueryBuilder()
          .insert()
          .into(MarketProduct)
          .values(marketProduct)
          .execute();
      }

      for (let i = 0; i < createProductDto.categoryNames.length; i++) {
        const category = await AppDataSource
          .createQueryBuilder()
          .select('c')
          .from(Category, 'c')
          .where('LOWER(c.name) = LOWER(:categoryName)', { categoryName: createProductDto.categoryNames[i] })
          .getOne();
        
        const productCategory = new ProductCategory()
        productCategory.category = category;
        productCategory.product = product;

        await AppDataSource.createQueryBuilder()
          .insert()
          .into(ProductCategory)
          .values(productCategory)
          .execute();
        
        if(market && marketProduct) {
          this.sendNotificationToClient(
            market.neighborhood, createProductDto.categoryNames[i], marketProduct
          );
        }
      }

      return product;
    } catch (err) {
      return err;
    }
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

    const clientsToNotify = await queryRunner.query(query, [category, neighborhood]);

    const notificationDto = new NotificationDto();
    notificationDto.isMarket = false;
    notificationDto.category = category;
    notificationDto.userData = clientsToNotify;
    notificationDto.marketProduct = {
      price: marketProduct.price,
      quantity: marketProduct.quantity,
      productName: marketProduct.product.name,
      marketName: marketProduct.market.name,
    }

    this.notificationService.sendNotification(notificationDto);
}

  async createProductCategory(createProductCategoryDto: CreateProductCategoryDto) {
    const product = await checkIfProductExists(createProductCategoryDto.productId);

    const category = await checkIfCategoryExists(createProductCategoryDto.categoryId);

    if (!product || !category) return 'Error to insert ProductCategory. Product or Category does not exist.'

    const productCategory = new ProductCategory();
    productCategory.product = product;
    productCategory.category = category;

    return await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(ProductCategory)
    .values(productCategory)
    .execute();
  }

  async findAll() {
    return await AppDataSource
      .createQueryBuilder()
      .select('p')
      .from(Product, 'p')
      .leftJoinAndSelect('p.productCategory', 'pc')
      .leftJoinAndSelect('pc.category', 'c')
      .getMany();
  }

  async findOne(id: number) {
    return await AppDataSource
    .createQueryBuilder()
    .select('p')
    .from(Product, 'p')
    .leftJoinAndSelect('p.productCategory', 'pc')
    .leftJoinAndSelect('pc.category', 'c')
    .where('p.id=:productId', { productId: id })
    .getOne();
  }

  async update(updateProductDto: UpdateProductDto) {
    return await AppDataSource
    .createQueryBuilder()
    .update(Product)
    .set(updateProductDto)
    .where('id=:productId', { productId: updateProductDto.id })
    .execute();
  }

  async updateProductCategory(updateProductCategoryDto: UpdateProductCategoryDto) {
    const product = await checkIfProductExists(updateProductCategoryDto.productId);
    const category = await checkIfCategoryExists(updateProductCategoryDto.categoryId);

    if (!product || !category) {
      return 'Error to update ProductCategory. Product or Category does not exist';
    }

    const productCategory = new ProductCategory();
    productCategory.product = product;
    productCategory.category = category;

    return await AppDataSource
    .createQueryBuilder()
    .update(ProductCategory)
    .set(productCategory)
    .where('id=:productCategoryId', { productCategoryId: updateProductCategoryDto.id })
    .execute();
  }

  async remove(id: number) {
    return await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id=:productId', { productId: id })
      .execute();
  }

  async removeProductCategory(id: number) {
    await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(ProductCategory)
    .where('id=:productCategoryId', { productCategoryId: id })
    .execute();
  }
}
