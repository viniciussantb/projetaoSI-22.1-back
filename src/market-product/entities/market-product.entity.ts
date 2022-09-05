import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { Market } from "src/market/entities/market.entity";

@ApiTags('Market Product')
@Entity({ name: 'market Product' })
export class MarketProduct {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty({ name: 'quantity', type: Number })
  @Column({ name: 'quantity', type: Number })
  quantity!: number;

  @ApiProperty({ name: 'Price', type: Number })
  @Column({ name: 'Price', type: Number })
  price!: number;

  @ApiProperty({ name: 'boosted', type: Boolean, })
  @Column({ name: 'boosted', type: Boolean, })
  boosted!: boolean;

  @ApiProperty({ name: 'active', type: Boolean, })
  @Column({ name: 'active', type: Boolean, })
  active!: boolean;

  @ApiProperty({ name: 'product', type: Product })
  @ManyToOne(() => Product, (product) => product.marketProduct)
  product!: Product;

  @ApiProperty({ name: 'market', type: Market })
  @ManyToOne(() => Market, (market) => market.marketProduct)
  market!: Market;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
