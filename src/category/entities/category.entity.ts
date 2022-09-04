import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
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

  @ApiProperty({ name: 'product', type: Product, nullable: true })
  @OneToMany(() => Product, (product) => product.category)
  product?: Product
}
