import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;
}
