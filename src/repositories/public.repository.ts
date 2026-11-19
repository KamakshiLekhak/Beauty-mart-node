import { count } from "console";
import { prisma } from "../config/prisma.ts";
import type { Brand, Category } from "../generated/prisma/client.ts";

export async function getBrands(): Promise<any> {
  const countProductQuery = { select: { products: {} } };
  const data = await prisma.brand.findMany({
    select: { id: true, name: true, slug: true, _count: countProductQuery },
  });
  const returningData = data.map((x) => {
    {
      return {
        id: x.id,
        name: x.name,
        slug: x.slug,
        productCount: x._count.products,
      };
    }
  });
  return returningData;
}

export async function getCategories(): Promise<any> {
  const countProductQuery = {
    //select: { products: { where: { productVariants: { some: {} } } } },
    select: { products: {} },
  };
  const data = await prisma.category.findMany({
    select: { id: true, name: true, slug: true, _count: countProductQuery },
  });
  const returningData = data.map((x) => {
    return {
      id: x.id,
      name: x.name,
      slug: x.slug,
      productCount: x._count.products,
    };
  });
  return returningData;
}
