import * as productVariantRepository from "../repositories/productVariant.repository.ts";

export async function getAllProductVariant() {
  return await productVariantRepository.getAllProductVariant();
}
