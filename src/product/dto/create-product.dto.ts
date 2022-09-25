import { IsString, IsNumber,IsNotEmpty } from "class-validator";
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
  @IsNotEmpty()
  @ApiProperty({ name: 'categoryIds', type: Number })
  categoryIds!: Number[];
}
