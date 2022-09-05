import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { MarketProduct } from "src/market-product/entities/market-product.entity";
import { Product } from "./product.entity";
import { Category } from "src/category/entities/category.entity";

@ApiTags('Product Category')
@Entity({ name: 'productCategory' })
export class ProductCategory {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;
  
  @ApiProperty({ name: 'product', type: Product })
  @ManyToOne(() => Product, (product) => product.productCategory)
  product!: Product;

  @ApiProperty({ name: 'category', type: Category })
  @ManyToOne(() => Category, (category) => category.productCategory)
  category!: Category;
}
