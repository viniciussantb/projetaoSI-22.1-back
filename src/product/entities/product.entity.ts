import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { MarketProduct } from "../../market-product/entities/market-product.entity";
import { ProductCategory } from "./productCategory.entity";

@ApiTags('Product')
@Entity({ name: 'product' })
export class Product {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ name: 'name', type: String })
  @Column({ name: 'name', type: String })
  name!: string;

  @ApiProperty({ name: 'description', type: String })
  @Column({ name: 'description', type: String })
  description!: string;

  @ApiProperty({ name: 'imageUrl', type: String, nullable: true })
  @Column({ name: 'imageUrl', type: String, nullable: true })
  imageUrl?: string;

  @ApiProperty({ name: 'marketProduct', type: MarketProduct, nullable: true })
  @OneToMany(() => MarketProduct, (marketProduct) => marketProduct.product)
  marketProduct?: MarketProduct[];

  @ApiProperty({ name: 'productCategory', type: ProductCategory, nullable: true })
  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
  productCategory?: ProductCategory[];
}
