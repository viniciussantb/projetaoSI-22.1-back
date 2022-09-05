import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { ProductCategory } from "src/product/entities/productCategory.entity";

@ApiTags('Category')
@Entity({ name: 'category' })
export class Category {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty({ name: 'productCategory', type: ProductCategory, nullable: true })
  @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
  productCategory?: ProductCategory[];

  @ApiProperty({ name: 'name', type: String })
  @Column({ name: 'name', type: String })
  name!: string;

  @ApiProperty({ name: 'description', type: Product, nullable: true })
  @Column({ name: 'description', type: String, nullable: true })
  description?: string
}
