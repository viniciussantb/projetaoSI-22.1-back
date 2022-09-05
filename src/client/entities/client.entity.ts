import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { ProductSelectionLog } from "src/product-selection-log/entities/product-selection-log.entity";

@ApiTags('Client')
@Entity({ name: 'client' })
export class Client {
  @ApiProperty({ name: 'id', type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty({ name: 'name', type: String })
  @Column({ name: 'name', type: String })
  name!: string;

  @ApiProperty({ name: 'nickname', type: String })
  @Column({ name: 'nickname', type: String })
  nickname!: string;

  @ApiProperty({ name: 'email', type: String })
  @Column({ name: 'email', type: String })
  email!: string;

  @ApiProperty({ name: 'password', type: String })
  @Column({ name: 'password', type: String })
  password!: string;

  @ApiProperty({ name: 'receiveEmail', type: Boolean })
  @Column({ name: 'receiveEmail', type: Boolean })
  receiveEmail!: boolean;

  @ApiProperty({ name: 'productSelectionLog', type: ProductSelectionLog, nullable: true })
  @OneToMany(() => ProductSelectionLog, (productSelectionLog) => productSelectionLog.client)
  productSelectionLog?: ProductSelectionLog[];
}
