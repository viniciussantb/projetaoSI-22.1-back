import { IsString, IsNumber,IsNotEmpty, IsArray } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('CreateProductDto')
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'name', type: String })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'description', type: String })
  description!: string;

  @IsString()
  @ApiProperty({ name: 'imageUrl', type: String, nullable: true })
  imageUrl?: string;

  @IsNumber()
  @ApiProperty({ name: 'price', type: Number, nullable: true })
  price?: number;

  @IsNumber()
  @ApiProperty({ name: 'marketId', type: Number, nullable: true })
  marketId?: number;

  @IsNumber()
  @ApiProperty({ name: 'quantity', type: Number, nullable: true })
  quantity?: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ name: 'categoryNames', type: String, isArray: true })
  categoryNames!: string[];
}
