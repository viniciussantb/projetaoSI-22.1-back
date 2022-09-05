import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiTags, ApiProperty } from "@nestjs/swagger";

@ApiTags('CreateMarketDto')
export class CreateMarketDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'username', type: String })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'password', type: String })
  password!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'name', type: String })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'ownerName', type: String })
  ownerName!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'email', type: String  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'neighborhood', type: String })
  neighborhood!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'adNumber', type: Number })
  adNumber!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'location', type: String })
  location!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'cep', type: String })
  cep!: string;
}
