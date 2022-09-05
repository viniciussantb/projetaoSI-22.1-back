import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('CreatePriceHistoryDto')
export class CreatePriceHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'marketProductId', type: Number })
  marketProductId!: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'price', type: Number })
  price!: number;
}
