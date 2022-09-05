import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { MarketProduct } from "src/market-product/entities/market-product.entity";

@ApiTags('Product')
@Entity({ name: 'product' })
export class Product {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
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
}
