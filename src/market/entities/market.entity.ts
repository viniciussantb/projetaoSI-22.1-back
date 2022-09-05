import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { MarketProduct } from "src/market-product/entities/market-product.entity";

@ApiTags('Market')
@Entity({ name: 'market' })
export class Market {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ name: 'id', type: Number })
  id!: number;

  @ApiProperty({ name: 'username', type: String })
  @Column({ name: 'username', type: String })
  username!: string;

  @ApiProperty({ name: 'password', type: String })
  @Column({ name: 'password', type: String })
  password!: string;

  @ApiProperty({ name: 'name', type: String })
  @Column({ name: 'name', type: String })
  name!: string;

  @ApiProperty({ name: 'ownerName', type: String })
  @Column({ name: 'ownerName', type: String })
  ownerName!: string;

  @ApiProperty({ name: 'email', type: String })
  @Column({ name: 'email', type: String })
  email!: string;

  @ApiProperty({ name: 'neighborhood', type: String })
  @Column({ name: 'neighborhood', type: String })
  neighborhood!: string;

  @ApiProperty({ name: 'adNumber', type: Number })
  @Column({ name: 'adNumber', type: Number })
  adNumber!: number;

  @ApiProperty({ name: 'location', type: String })
  @Column({ name: 'location', type: String })
  location!: string;

  @ApiProperty({ name: 'cep', type: String })
  @Column({ name: 'cep', type: String })
  cep!: string;

  @ApiProperty({ name: 'marketProduct', type: MarketProduct })
  @OneToMany(() => MarketProduct, (marketProduct) => marketProduct.market)
  marketProduct?: MarketProduct[];
}
