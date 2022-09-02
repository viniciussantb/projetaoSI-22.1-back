import { PartialType } from '@nestjs/swagger';
import { CreateMarketDto } from './create-market.dto';

export class UpdateMarketDto extends PartialType(CreateMarketDto) {}
