import { prisma } from "../config/prisma.ts";
import type { CreateProduct } from "../schemas/admin.schema.ts";

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


