import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from '@nestjs/common';
import { MarketProductService } from './market-product.service';
import { CreateMarketProductDto } from './dto/create-market-product.dto';
import { UpdateMarketProductDto } from './dto/update-market-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Market-Product')
@Controller('market-product')
export class MarketProductController {
  constructor(private readonly marketProductService: MarketProductService) {}

  @Post()
  async create(
    @Body() createMarketProductDto: CreateMarketProductDto,
    @Res() res: Response
    ) {
    const marketProduct = await this.marketProductService.create(createMarketProductDto);

    if (!(marketProduct instanceof Object)) {
      res.status(400).send({ message: marketProduct })
    }

    return marketProduct;
  }

  @Get()
  async findAll() {
    return await this.marketProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.marketProductService.findOne(+id);
  }

  @Put()
  async update(
    @Res() res: Response,
    @Body() updateMarketProductDto: UpdateMarketProductDto
    ) {
    const marketProduct = await this.marketProductService.update(updateMarketProductDto);

    if (!(marketProduct instanceof Object)) {
      res.status(400).send({ message: marketProduct })
    }

    return marketProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.marketProductService.remove(+id);
  }
}
