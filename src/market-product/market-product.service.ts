import { Injectable } from '@nestjs/common';
import { CreateMarketProductDto } from './dto/create-market-product.dto';
import { UpdateMarketProductDto } from './dto/update-market-product.dto';

@Injectable()
export class MarketProductService {
  create(createMarketProductDto: CreateMarketProductDto) {
    return 'This action adds a new marketProduct';
  }

  findAll() {
    return `This action returns all marketProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketProduct`;
  }

  update(id: number, updateMarketProductDto: UpdateMarketProductDto) {
    return `This action updates a #${id} marketProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketProduct`;
  }
}
