import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('CreateMarketProductDto')
export class CreateMarketProductDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'quantity', type: Number })
  quantity!: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'price', type: Number })
  price!: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ name: 'boosted', type: Boolean })
  boosted?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ name: 'active', type: Boolean })
  active?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'productId', type: Number })
  productId!: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'marketId', type: Number })
  marketId!: number;
}
