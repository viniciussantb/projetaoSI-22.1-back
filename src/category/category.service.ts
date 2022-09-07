import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../app.data-source';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async findAll() {
    return await AppDataSource
      .createQueryBuilder()
      .select('c')
      .from(Category, 'c')
      .getMany();
  }

  async findOne(id: number) {
    return await AppDataSource
      .createQueryBuilder()
      .select('c')
      .from(Category, 'c')
      .where('c.id=:categoryId', { categoryId: id })
      .getOne();
  }
}
