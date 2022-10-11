import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Market } from "../../market/entities/market.entity";
import { Category } from "../../category/entities/category.entity";

@ApiTags('MarketNotification')
@Entity({ name: 'marketNotification' })
export class MarketNotification {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ name: 'category', type: Category })
  @ManyToOne(() => Category, (category) => category.marketNotification)
  category?: Category;

  @ApiProperty({ name: 'neighborhood', type: String, default: true })
  @Column({ name: 'neighborhood', type: String, default: true })
  neighborhood!: string;

  @ApiProperty({ name: 'active', type: Boolean, default: true })
  @Column({ name: 'active', type: Boolean, default: true })
  active!: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
