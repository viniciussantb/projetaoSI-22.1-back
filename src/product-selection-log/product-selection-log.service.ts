import { Injectable } from '@nestjs/common';
import { CreateProductSelectionLogDto } from './dto/create-product-selection-log.dto';
import { UpdateProductSelectionLogDto } from './dto/update-product-selection-log.dto';

@Injectable()
export class ProductSelectionLogService {
  create(createProductSelectionLogDto: CreateProductSelectionLogDto) {
    return 'This action adds a new productSelectionLog';
  }

  findAll() {
    return `This action returns all productSelectionLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSelectionLog`;
  }

  update(id: number, updateProductSelectionLogDto: UpdateProductSelectionLogDto) {
    return `This action updates a #${id} productSelectionLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSelectionLog`;
  }
}
