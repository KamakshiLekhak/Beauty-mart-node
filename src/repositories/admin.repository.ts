import { id } from "zod/locales";
import { prisma } from "../config/prisma.ts";
import type { Brand, Category } from "../generated/prisma/client.ts";
import type {
  BrandRequest,
  BrandUpdate,
  CategoryRequest,
  CategoryUpdate,
} from "../schemas/admin.schema.ts";

export async function insertCategory(
  categoryInput: CategoryRequest,
): Promise<Category> {
  return prisma.category.create({ data: categoryInput });
}

export async function insertBrand(brandInput: BrandRequest): Promise<Brand> {
  return prisma.brand.create({ data: brandInput });
}

export async function updateBrand(
  id: number,
  body: BrandUpdate,
): Promise<Brand | null> {
  return prisma.brand.update({ where: { id: id }, data: body });
}

export async function updateCategory(
  id: number,
  body: CategoryUpdate,
): Promise<Category | null> {
  return prisma.category.update({ where: { id: id }, data: body });
}
