import { IsBoolean, IsString, IsNotEmpty } from "class-validator";
import { ApiTags, ApiProperty } from "@nestjs/swagger";

@ApiTags('CreateClientDto')
export class CreateClientDto {
@IsString()
@IsNotEmpty()
@ApiProperty({ name: 'name', type: String })
name!: string;

@IsString()
@IsNotEmpty()
@ApiProperty({ name: 'nickname', type: String  })
nickname!: string;

@IsString()
@IsNotEmpty()
@ApiProperty({ name: 'email', type: String  })
email!: string;

@IsNotEmpty()
@IsString()
@ApiProperty({ name: 'password', type: String  })
password!: string;

@IsNotEmpty()
@IsBoolean()
@ApiProperty({ name: 'receiveEmail', type: Boolean  })
receiveEmail!: boolean;
}
