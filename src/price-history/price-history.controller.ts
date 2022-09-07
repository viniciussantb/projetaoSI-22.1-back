import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Price-History')
@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @Post()
  create(@Body() createPriceHistoryDto: CreatePriceHistoryDto) {
    return this.priceHistoryService.create(createPriceHistoryDto);
  }

  @Get()
  findAll() {
    return this.priceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceHistoryDto: UpdatePriceHistoryDto) {
    return this.priceHistoryService.update(+id, updatePriceHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceHistoryService.remove(+id);
  }
}
