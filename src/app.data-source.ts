import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/database/migrations'],
});