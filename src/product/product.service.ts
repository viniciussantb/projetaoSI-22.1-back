import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AppDataSource } from '../app.data-source';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductService {
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

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
