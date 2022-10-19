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

@Injectable()
export class ProductService {

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

      if (createProductDto.marketId) {
        const market = await checkIfMarketExists(createProductDto.marketId);
        const marketProduct = new MarketProduct();
        marketProduct.market = market;
        marketProduct.active = true;
        marketProduct.price = createProductDto.price;
        marketProduct.product = product;
        marketProduct.quantity = createProductDto.quantity;

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
      }

      return product;
    } catch (err) {
      return err;
    }
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
