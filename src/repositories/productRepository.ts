import { prisma } from "../config/prisma.ts";
import type { ProductOrderByWithRelationInput } from "../generated/prisma/models.ts";
import type { CreateProduct } from "../schemas/admin.schema.ts";
import type { ProductFilter } from "../schemas/product.schema.ts";

export async function insertProduct(productInput: CreateProduct) {
  const { images, ...everythingElse } = productInput;

  const imagesWithPosition = images.map((x, i) => {
    return { url: x.url, text: x.text, position: i };
  });

  const dataToBeSaved = {
    images: { create: imagesWithPosition },
    reviewCount: 0,
    ...everythingElse,
  };

  const p = await prisma.product.create({
    data: dataToBeSaved,
    include: { images: true },
  });
  return p;
}

export async function getAllProduct() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
}

export async function updateStartingPrice(productId: number) {
  const minPriceProductVariant = await prisma.productVariant.findFirst({
    where: { productId: productId },
    orderBy: { price: "asc" },
  });
  const minimumPrice = minPriceProductVariant?.price ?? 0;
  await prisma.product.update({
    where: { id: productId },
    data: { startingPrice: minimumPrice },
  });
}

function getOrderByobject(sort: string): ProductOrderByWithRelationInput {
  switch (sort) {
    case "newest":
      return { createdAt: "desc" };
    case "price_asc":
      return { startingPrice: "asc" };
    case "price_desc":
      return { startingPrice: "desc" };
    case "rating":
      return { rating: "desc" };
    default:
      return { createdAt: "desc" };
  }
}

export async function filterPaginatedProducts(query: ProductFilter) {
  const whereObject = {
    isActive: true,
    id: query?.id ?? undefined,
    categoryId: query?.category ?? undefined,
    category: query.categorySlug ? { slug: query.categorySlug } : undefined,
    brandId: query?.brand ?? undefined,
    skinTypes: query.skinType ? { has: query.skinType } : undefined,
    concerns: query.concern ? { has: query.concern } : undefined,
    startingPrice: { gte: query.minPrice, lte: query.maxPrice },
  };
  const data = await prisma.product.findMany({
    where: whereObject,
    orderBy: getOrderByobject(query.sort),
    skip: (query.page - 1) * query.limit,
    take: query.limit,
  });
  const count = await prisma.product.count({
    where: whereObject,
  });
  return { data: data, count: count };
}
