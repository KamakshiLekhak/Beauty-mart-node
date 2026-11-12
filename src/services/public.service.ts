import type { Brand, Category } from "../generated/prisma/client.ts";
import * as publicRpository from "../repositories/public.repository.ts";

export async function getBrands(): Promise<Brand[]> {
  return await publicRpository.getBrands();
}

export async function getCategories(): Promise<Category[]> {
  return await publicRpository.getCategories();
}
