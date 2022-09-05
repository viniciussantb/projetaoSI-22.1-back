import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { MarketProduct } from "src/market-product/entities/market-product.entity";

@ApiTags('Price History')
@Entity({ name: 'priceHistory' })
export class PriceHistory {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty({ name: 'marketProduct', type: MarketProduct })
  @ManyToOne(() => MarketProduct, (marketProduct) => marketProduct.priceHistory)
  marketProduct!: MarketProduct;

  @ApiProperty({ name: 'price', type: Number })
  @Column({ name: 'price', type: Number })
  price!: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
