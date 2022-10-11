import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiTags, ApiProperty } from "@nestjs/swagger";

@ApiTags('CreateMarketNotificationDto')
export class CreateMarketNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'categoryId', type: Number })
  categoryId!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'neighborhood', type: String })
  neighborhood!: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ name: 'active', type: Boolean })
  active!: boolean;
}
