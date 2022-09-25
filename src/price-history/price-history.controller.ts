import { Controller, Get, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Price-History')
@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createPriceHistoryDto: CreatePriceHistoryDto
    ) {
    const priceHistory = await this.priceHistoryService.create(createPriceHistoryDto);

    if (!(priceHistory instanceof Object)) {
      return res.status(400).send({ message: priceHistory });
    }
    return res.status(200).send({ message: priceHistory });
  }

  @Get()
  findAll() {
    return this.priceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceHistoryService.findOne(+id);
  }

  @Put()
  async update(
    @Body() updatePriceHistoryDto: UpdatePriceHistoryDto,
    @Res() res: Response,
    ) {
    const priceHistory = await this.priceHistoryService.update(updatePriceHistoryDto);

    if (!(priceHistory instanceof Object)) {
      return res.status(400).send({ message: priceHistory });
    }
    return res.status(200).send({ message: priceHistory });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceHistoryService.remove(+id);
  }
}
