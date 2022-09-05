import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Product } from "./product.entity";
import { Category } from "../../category/entities/category.entity";

@ApiTags('Product Category')
@Entity({ name: 'productCategory' })
export class ProductCategory {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ApiProperty({ name: 'product', type: Product })
  @ManyToOne(() => Product, (product) => product.productCategory)
  product!: Product;

  @ApiProperty({ name: 'category', type: Category })
  @ManyToOne(() => Category, (category) => category.productCategory)
  category!: Category;
}
