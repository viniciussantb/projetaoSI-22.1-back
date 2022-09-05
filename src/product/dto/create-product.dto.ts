import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('CreateProductDto')
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'name', type: String })
  name!: String;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'description', type: String })
  description!: string;

  @IsString()
  @ApiProperty({ name: 'imageUrl', type: String, nullable: true })
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'category', type: String })
  category!: String;
}
