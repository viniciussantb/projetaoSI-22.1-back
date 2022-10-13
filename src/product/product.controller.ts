import { Controller, Get, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { Response } from 'express';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategory } from './entities/productCategory.entity';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response
    ) {
    const product =  await this.productService.create(createProductDto);
    if (!(product instanceof Object)) {
      return res.status(400).send({ message: product });
    }
    return res.status(200).send(product);
  }

  @Post('/category')
  async createProductCategory(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @Res() res: Response
    ) {
      const productCategory =  await this.productService.createProductCategory(createProductCategoryDto);
      if (!(productCategory instanceof Object)) {
        return res.status(400).send({ message: productCategory });
      }
      return res.status(200).send(productCategory);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put()
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }

  @Put('/category')
  async updateProductCategory(
    @Res() res: Response,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
      const productCategoryUpdated = await this.productService.updateProductCategory(updateProductCategoryDto);
      if (!(productCategoryUpdated instanceof Object)) 
        return res.status(400).send({ message: productCategoryUpdated })
      return res.status(200).send({ message: productCategoryUpdated })
    }
  
  @Delete('/cateogory/:id')
  async removeProductCategory(@Param('id') id: string) {
    return await this.productService.removeProductCategory(+id);
  }
}
