import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketProductService } from './market-product.service';
import { CreateMarketProductDto } from './dto/create-market-product.dto';
import { UpdateMarketProductDto } from './dto/update-market-product.dto';

@Controller('market-product')
export class MarketProductController {
  constructor(private readonly marketProductService: MarketProductService) {}

  @Post()
  create(@Body() createMarketProductDto: CreateMarketProductDto) {
    return this.marketProductService.create(createMarketProductDto);
  }

  @Get()
  findAll() {
    return this.marketProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketProductDto: UpdateMarketProductDto) {
    return this.marketProductService.update(+id, updateMarketProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketProductService.remove(+id);
  }
}
