import { 
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column
 } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Client } from "../../client/entities/client.entity";
import { MarketProduct } from "../../market-product/entities/market-product.entity";
import { Category } from "../../category/entities/category.entity";

@ApiTags('Product Selection Log')
@Entity({ name: 'productSelectionLog' })
export class ProductSelectionLog {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ name: 'client', type: Client })
  @ManyToOne(() => Client, (client) => client.productSelectionLog)
  client!: Client;

  @ApiProperty({ name: 'category', type: Category })
  @ManyToOne(() => Category, (category) => category.productSelectionLog)
  category!: Category;

  @ApiProperty({ name:'neighborhood', type: String })
  @Column({ name: 'neighborhood', type: String })
  neighborhood!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
