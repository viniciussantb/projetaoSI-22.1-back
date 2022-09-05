import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMarketDto } from './create-market.dto';

@ApiTags('UpdateMarketDto')
export class UpdateMarketDto extends CreateMarketDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;
}
