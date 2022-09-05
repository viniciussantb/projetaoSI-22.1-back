import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateProductSelectionLogDto } from './create-product-selection-log.dto';

export class UpdateProductSelectionLogDto extends CreateProductSelectionLogDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;
}
