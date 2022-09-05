import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('CreateProductSelectionLogDto')
export class CreateProductSelectionLogDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'marketProductId', type: Number })
  marketProductId!: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'clientId', type: Number })
  clientId!: number;
}
