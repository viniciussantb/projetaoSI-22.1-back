import { IsString, IsNumber,IsNotEmpty, IsArray } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('CreateCategoryDto')
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'name', type: String })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'description', type: String, nullable: true })
  description?: string;  
}
