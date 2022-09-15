import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AppDataSource } from '../app.data-source';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductCategory } from './entities/productCategory.entity';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Injectable()
export class ProductService {
  async checkIfProductExists(id: number) {
    return await AppDataSource
    .createQueryBuilder()
    .select('p')
    .from(Product, 'p')
    .where('p.id=:productId', { productId: id })
    .getOne();
  }

  async checkIfCategoryExists(id: number) {
    return await AppDataSource
    .createQueryBuilder()
    .select('p')
    .from(Category, 'p')
    .where('p.id=:categoryId', { categoryId: id })
    .getOne();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const product = new Product();
      product.name = createProductDto.name;
      product.description = createProductDto.description;
      product.imageUrl = createProductDto.imageUrl;

      await queryRunner.manager.save(product);

      for (let i = 0; i < createProductDto.categoryIds.length; i++) {
        const category = await AppDataSource
          .createQueryBuilder()
          .select('c')
          .from(Category, 'c')
          .where('c.id=:categoryId', { categoryId: createProductDto.categoryIds[i] })
          .getOne();
        
        if (!category){
          throw 'Category does not exist';
        }
        const productCategory = new ProductCategory()
        productCategory.category = category;
        productCategory.product = product;

        await queryRunner.manager.save(productCategory);
      }
      
      await queryRunner.commitTransaction();

      return product;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    }
  }

  async createProductCategory(createProductCategoryDto: CreateProductCategoryDto) {
    const product = await this.checkIfProductExists(createProductCategoryDto.productId);

    const category = await this.checkIfCategoryExists(createProductCategoryDto.categoryId);

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
    const product = await this.checkIfProductExists(updateProductCategoryDto.productId);
    const category = await this.checkIfCategoryExists(updateProductCategoryDto.categoryId);

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
