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

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ name: 'categoryNames', type: String, isArray: true })
  categoryNames!: string[];
}
