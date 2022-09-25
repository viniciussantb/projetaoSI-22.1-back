import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Market')
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketService.create(createMarketDto);
  }

  @Get()
  findAll() {
    return this.marketService.findAll();
  }

  @Get('neighborhood')
  findByNeighborhood(
    @Query('neighborhood') neighborhood: string
  ) {
    return this.marketService.findByNeighborhood(neighborhood);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketService.findOne(+id);
  }

  @Put()
  update(@Body() updateMarketDto: UpdateMarketDto) {
    return this.marketService.update(updateMarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketService.remove(+id);
  }
}
