import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Product } from "../../product/entities/product.entity";
import { Market } from "../../market/entities/market.entity";
import { PriceHistory } from "../../price-history/entities/price-history.entity";

@ApiTags('Market Product')
@Entity({ name: 'marketProduct' })
export class MarketProduct {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ name: 'quantity', type: Number })
  @Column({ name: 'quantity', type: Number })
  quantity!: number;

  @ApiProperty({ name: 'Price', type: Number })
  @Column({ name: 'Price', type: Number })
  price!: number;

  @ApiProperty({ name: 'boosted', type: Boolean, nullable: true })
  @Column({ name: 'boosted', type: Boolean, nullable: true })
  boosted?: boolean;

  @ApiProperty({ name: 'active', type: Boolean, })
  @Column({ name: 'active', type: Boolean, })
  active!: boolean;

  @ApiProperty({ name: 'product', type: Product })
  @ManyToOne(() => Product, (product) => product.marketProduct)
  product!: Product;

  @ApiProperty({ name: 'market', type: Market })
  @ManyToOne(() => Market, (market) => market.marketProduct)
  market!: Market;

  @ApiProperty({ name: 'priceHistory', type: PriceHistory })
  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.marketProduct)
  priceHistory?: PriceHistory[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
