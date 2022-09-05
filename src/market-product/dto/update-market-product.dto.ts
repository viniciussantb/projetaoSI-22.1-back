import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMarketProductDto } from './create-market-product.dto';

@ApiTags('Update market product Dto')
export class UpdateMarketProductDto extends CreateMarketProductDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;
}
