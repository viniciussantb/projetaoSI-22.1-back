import { PartialType } from '@nestjs/swagger';
import { CreateProductSelectionLogDto } from './create-product-selection-log.dto';

export class UpdateProductSelectionLogDto extends PartialType(CreateProductSelectionLogDto) {}
