import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: !!process.env.POSTGRES_SYNCHROZINE,
  logging: !!process.env.POSTGRES_LOGGING,
  entities: [process.env.POSTGRES_ENTITIES!],
  migrations: [process.env.POSTGRES_MIGRATIONS!],

})