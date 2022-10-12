import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Category } from "../../category/entities/category.entity";
import { Client } from "../../client/entities/client.entity";

@ApiTags('ClientNotification')
@Entity({ name: 'clientNotification' })
export class ClientNotification {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ name: 'client', type: Client, nullable: true })
  @ManyToOne(() => Client, (client) => client.clientNotification)
  client?: Client;

  @ApiProperty({ name: 'category', type: Category })
  @ManyToOne(() => Category)
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
