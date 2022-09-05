import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";

@ApiTags('Category')
@Entity({ name: 'category' })
export class Category {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty({ name: 'name', type: String })
  @Column({ name: 'name', type: String })
  name!: string;

  @ApiProperty({ name: 'description', type: Product, nullable: true })
  @Column({ name: 'description', type: String, nullable: true })
  description?: string
}
