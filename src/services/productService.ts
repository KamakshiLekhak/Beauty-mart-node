import type { Product } from "../generated/prisma/client.ts";
import * as productRepository from "../repositories/productRepository.ts";

export async function getAllProducts() {
  return await productRepository.getAllProduct();
}
