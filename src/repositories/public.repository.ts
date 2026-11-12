import { prisma } from "../config/prisma.ts";
import type { Brand, Category } from "../generated/prisma/client.ts";

export async function getBrands(): Promise<Brand[]> {
  return prisma.brand.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    orderBy: { id: "asc" },
  });
}
