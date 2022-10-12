import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiTags, ApiProperty } from "@nestjs/swagger";

@ApiTags('CreateClientNotificationDto')
export class CreateClientNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'clientId', type: Number })
  clientId!: number;

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
