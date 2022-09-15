import { IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { CreateProductCategoryDto } from "./create-product-category.dto";

@ApiTags('Update Product Category Dto')
export class UpdateProductCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'productId', type: Number, nullable: true })
  productId?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'categoryId', type: Number })
  categoryId!: number;
}