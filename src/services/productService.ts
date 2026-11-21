import type { Product } from "../generated/prisma/client.ts";
import * as productRepository from "../repositories/productRepository.ts";
import type { ProductFilter } from "../schemas/product.schema.ts";

export async function getAllProducts() {
  return await productRepository.getAllProduct();
}

export async function filterPaginatedProducts(query: ProductFilter) {
  return await productRepository.filterPaginatedProducts(query);
}
