import { IsNumber, IsNotEmpty } from 'class-validator';
import { CreateClientDto } from './create-client.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('UpdateClientDto')
export class UpdateClientDto extends CreateClientDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;
}
