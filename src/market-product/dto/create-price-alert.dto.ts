import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('CreatePriceAlertDto')
export class CreatePriceAlertDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'clientId', type: Number })
  clientId!: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'category', type: String, isArray: true })
  category!: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'neighborhood', type: String })
  neighborhood?: string;
}
