import { PartialType } from '@nestjs/swagger';
import { CreateMarketProductDto } from './create-market-product.dto';

export class UpdateMarketProductDto extends PartialType(CreateMarketProductDto) {}
