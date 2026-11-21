import { number } from "zod";
import type { Product } from "../generated/prisma/client.ts";
import * as productRepository from "../repositories/productRepository.ts";
import type {
  ProductCardResponse,
  ProductFilter,
} from "../schemas/product.schema.ts";

export async function getAllProducts() {
  return await productRepository.getAllProduct();
}

function calculateDiscount(
  mrp: number | undefined,
  price: number | undefined,
): number | null {
  if (!mrp || !price) {
    return null;
  }
  return Math.round((mrp - price) / mrp) * 100;
}
export async function filterPaginatedProducts(query: ProductFilter) {
  const { data, count } =
    await productRepository.filterPaginatedProducts(query);

  const returnedData = data.map((x) => {
    const cheapestVariant = x.productVariants.reduce((cheapest, variant) => {
      if (cheapest.price.toNumber() < cheapest.mrp.toNumber()) {
        return cheapest;
      } else {
        return variant;
      }
    });
    return {
      id: x.id,
      name: x.name,
      slug: x.slug,
      rating: x.rating,
      reviewCount: x.reviewCount,
      brand: x.brand.name,
      category: x.category.name,
      images: x.images[0] ?? null,
      price: cheapestVariant?.price,
      mrp: cheapestVariant?.mrp,
      discount: calculateDiscount(
        cheapestVariant?.mrp?.toNumber(),
        cheapestVariant?.price?.toNumber(),
      ),
      optionCount: x.productVariants.length,
    };
  });
  return {count: count, data : returnedData}
}
