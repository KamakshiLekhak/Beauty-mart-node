import { prisma } from "../config/prisma.ts";
import type { CreateProductVariant } from "../schemas/admin.schema.ts";
import type { ProductVariant } from "../generated/prisma/client.ts";
import { updateStartingPrice } from "./productRepository.ts";

export async function insertProductVariant(
  productId: number,
  body: CreateProductVariant,
): Promise<ProductVariant> {
  const { images, ...fields } = body;
  const imagesToBeSaved = images.map((x, i) => {
    return {
      url: x.url,
      text: x.text,
      productId: productId,
      position: i,
    };
  });
  const productVariant = await prisma.productVariant.create({
    data: {
      productId: productId,
      ...fields,
      images: { create: imagesToBeSaved },
    },
    include: { images: true },
  });
  await updateStartingPrice(productId); /////whyyy inside this??
  return productVariant;
}

export async function getAllProductVariant() {
  return await prisma.productVariant.findMany({
    orderBy: { productId: "asc" },
  });
}
