import { DataSource } from "typeorm";
import 'dotenv/config';

import { Category } from "./category/entities/category.entity";
import { Client } from "./client/entities/client.entity";
import { Market } from "./market/entities/market.entity";
import { MarketProduct } from "./market-product/entities/market-product.entity";
import { MarketNotification } from "./notification/entities/marketNotification.enitity";
import { ClientNotification } from "./notification/entities/clientNotification.entity";
import { PriceHistory } from "./price-history/entities/price-history.entity";
import { Product } from "./product/entities/product.entity";
import { ProductCategory } from "./product/entities/productCategory.entity";
import { ProductSelectionLog } from "./product-selection-log/entities/product-selection-log.entity";

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: false,
  migrations: ["dist/database/migrations/**/*.js"],
  entities: [
    Category,
    Client,
    Market,
    MarketProduct,
    MarketNotification,
    ClientNotification,
    PriceHistory,
    Product,
    ProductCategory,
    ProductSelectionLog,
  ],
});