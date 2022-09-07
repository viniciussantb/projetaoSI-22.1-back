import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSelectionLogService } from './product-selection-log.service';
import { CreateProductSelectionLogDto } from './dto/create-product-selection-log.dto';
import { UpdateProductSelectionLogDto } from './dto/update-product-selection-log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product-Selection-Log')
@Controller('product-selection-log')
export class ProductSelectionLogController {
  constructor(private readonly productSelectionLogService: ProductSelectionLogService) {}

  @Post()
  create(@Body() createProductSelectionLogDto: CreateProductSelectionLogDto) {
    return this.productSelectionLogService.create(createProductSelectionLogDto);
  }

  @Get()
  findAll() {
    return this.productSelectionLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSelectionLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSelectionLogDto: UpdateProductSelectionLogDto) {
    return this.productSelectionLogService.update(+id, updateProductSelectionLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSelectionLogService.remove(+id);
  }
}
