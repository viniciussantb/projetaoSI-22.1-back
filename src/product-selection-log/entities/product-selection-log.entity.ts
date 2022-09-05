import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Client } from "../../client/entities/client.entity";
import { MarketProduct } from "../../market-product/entities/market-product.entity";

@ApiTags('Product Selection Log')
@Entity({ name: 'ProductSelectionLog' })
export class ProductSelectionLog {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty({ name: 'client', type: Client })
  @ManyToOne(() => Client, (client) => client.productSelectionLog)
  client!: Client;

  @ApiProperty({ name: 'marketProduct', type: MarketProduct })
  @ManyToOne(() => MarketProduct, (marketProduct) => marketProduct.productSelectionLog)
  marketProduct!: MarketProduct;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
