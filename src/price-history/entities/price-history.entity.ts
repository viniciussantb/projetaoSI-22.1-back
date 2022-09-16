import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { MarketProduct } from "../../market-product/entities/market-product.entity";

@ApiTags('Price History')
@Entity({ name: 'priceHistory' })
export class PriceHistory {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn()
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
