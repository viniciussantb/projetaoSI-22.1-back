import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res } from '@nestjs/common';
import { Response } from 'express';
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

  @Get('/login')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
    @Res() res: Response,
    ) {
      const user = await this.marketService.login(email, password);

      if (!user) return res.status(404).send('Comércio não encontrado');

      return res.status(200).send(user);
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
