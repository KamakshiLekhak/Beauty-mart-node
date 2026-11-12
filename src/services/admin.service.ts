import type {
  BrandRequest,
  BrandUpdate,
  CategoryRequest,
  CategoryUpdate,
} from "../schemas/admin.schema.ts";
import * as adminRepository from "../repositories/admin.repository.ts";
import type { Brand, Category } from "../generated/prisma/client.ts";

export async function addCategory(
  categoryInput: CategoryRequest,
): Promise<Category> {
  categoryInput.slug = categoryInput.slug.toLowerCase();
  return await adminRepository.insertCategory(categoryInput);
}

export async function addBrand(brandInput: BrandRequest): Promise<Brand> {
  brandInput.slug = brandInput.slug.toLowerCase();
  return await adminRepository.insertBrand(brandInput);
}

export async function updateBrand(
  id: number,
  body: BrandUpdate,
): Promise<Brand | null> {
  body.slug = body.slug.toLowerCase();
  return await adminRepository.updateBrand(id, body);
}
export async function updateCategory(
  id: number,
  body: CategoryUpdate,
): Promise<Category | null> {
  body.slug = body.slug.toLowerCase();
  return await adminRepository.updateCategory(id, body);
}
