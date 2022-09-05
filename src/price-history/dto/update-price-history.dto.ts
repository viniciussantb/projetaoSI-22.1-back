import { PartialType } from '@nestjs/swagger';
import { CreatePriceHistoryDto } from './create-price-history.dto';

export class UpdatePriceHistoryDto extends PartialType(CreatePriceHistoryDto) {}
