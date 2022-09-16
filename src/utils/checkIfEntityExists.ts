import { AppDataSource } from "src/app.data-source";
import { Category } from "src/category/entities/category.entity";
import { MarketProduct } from "src/market-product/entities/market-product.entity";
import { Market } from "src/market/entities/market.entity";
import { Product } from "src/product/entities/product.entity";

export async function checkIfMarketProductExists(id: number) {
  return await AppDataSource
  .createQueryBuilder()
  .select('mp')
  .from(MarketProduct, 'mp')
  .where('mp.id=:marketProductId', { marketProductId: id })
  .getOne();
}

export async function checkIfMarketExists(id: number) {
  return await AppDataSource
  .createQueryBuilder()
  .select('m')
  .from(Market, 'm')
  .where('m.id=:marketId', { MarketId: id })
  .getOne();
}

export async function checkIfProductExists(id: number) {
  return await AppDataSource
  .createQueryBuilder()
  .select('p')
  .from(Product, 'p')
  .where('p.id=:productId', { productId: id })
  .getOne();
}

export async function checkIfCategoryExists(id: number) {
  return await AppDataSource
  .createQueryBuilder()
  .select('p')
  .from(Category, 'p')
  .where('p.id=:categoryId', { categoryId: id })
  .getOne();
}