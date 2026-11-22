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
  return Math.round(((mrp - price) / mrp) * 100);
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
  return { count: count, data: returnedData };
}

function checkStock(stock: number) {
  if (stock == 0) {
    return false;
  } else {
    return true;
  }
}
export async function getProductInDetail(id: number) {
  const data = await productRepository.getProductInDetail(id);
  if (!data) {
    return null;
  }
  const variants = data?.productVariants.map((x) => {
    return {
      id: x.id,
      label: x.label,
      mrp: x.mrp,
      price: x.price,
      discountPercentage: calculateDiscount(
        x.mrp.toNumber(),
        x.price.toNumber(),
      ),
      inStock: checkStock(x.stock),
    };
  });
  const returningData = {
    id: data?.id,
    name: data?.name,
    slug: data?.slug,
    description: data?.description,
    skinTypes: data?.skinTypes,
    concerns: data?.concerns,
    rating: data?.rating,
    reviewCount: data?.reviewCount,
    brand: data?.brand?.name,
    category: data?.category?.name,
    images: data?.images[0] ?? null,
    variants: variants,
  };
  return returningData;
}
