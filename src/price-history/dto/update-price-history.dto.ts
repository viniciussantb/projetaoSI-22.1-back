import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreatePriceHistoryDto } from './create-price-history.dto';

export class UpdatePriceHistoryDto extends CreatePriceHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;
}
