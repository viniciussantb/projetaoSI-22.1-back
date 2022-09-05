import { IsNumber, IsNotEmpty } from "class-validator";
import { ApiTags, ApiProperty } from "@nestjs/swagger";

@ApiTags('CreateProductCategoryDto')
export class CreateProductCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'productId', type: Number })
  productId!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'categoryId', type: Number })
  categoryId!: number;
}
