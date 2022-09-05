import { IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { CreateProductCategoryDto } from "./create-product-category.dto";

@ApiTags('Update Product Category Dto')
export class UpdateProductCategoryDto extends CreateProductCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', type: Number })
  id!: number;
}