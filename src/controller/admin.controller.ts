import type { Request, Response } from "express";
import {
  brandRequestSchema,
  categoryRequestSchema,
  createProductVariantSchema,
  idSchema,
  idSchemaInUrl,
  productCreateSchema,
  updateBrandSchema,
  updateCategorySchema,
} from "../schemas/admin.schema.ts";
import * as adminService from "../services/admin.service.ts";

export async function addCategory(req: Request, res: Response) {
  const body = categoryRequestSchema.parse(req.body);
  const addedCategory = await adminService.addCategory(body);
  return res.json({ data: addedCategory });
}

export async function addBrand(req: Request, res: Response) {
  const body = brandRequestSchema.parse(req.body);
  const addedBrand = await adminService.addBrand(body);
  return res.json({ data: addedBrand });
}

export async function updateBrand(req: Request, res: Response) {
  const id = idSchemaInUrl.parse(req.params.id);
  const body = updateBrandSchema.parse(req.body);
  const existingBrand = await adminService.getBrandBySlug(body.slug);
  if (existingBrand && existingBrand.id != id) {
    res.status(409).json({ message: "This slug already exists!!" });
  }
  const updatedBrand = await adminService.updateBrand(id, body);
  if (!updatedBrand) {
    return res.status(404).json({ message: "The brand doesnot exist" });
  }
  return res.status(200).json({ data: updatedBrand });
}

export async function updateCategory(req: Request, res: Response) {
  const id = idSchemaInUrl.parse(req.params.id);
  const body = updateCategorySchema.parse(req.body);
  const existingCategory = await adminService.getCategoryBySlug(body.slug);
  if (existingCategory && existingCategory.id != id) {
    res.status(409).json({ message: "This slug already exists!!" });
  }
  const updatedCategory = await adminService.updateCategory(id, body);
  if (!updatedCategory) {
    res.status(404).json("This category doesnot exist");
  }

  return res.status(200).json({ data: updatedCategory });
}

export async function addProduct(req: Request, res: Response) {
  const body = productCreateSchema.parse(req.body);
  const addedProduct = await adminService.addProuct(body);
  return res.json({ data: addedProduct });
}

export async function addProductVariant(req: Request, res: Response) {
  const productId = idSchemaInUrl.parse(req.params.productId);
  const body = createProductVariantSchema.parse(req.body);
  const productVariant = await adminService.addProductVariant(productId, body);
  return res.json({ data: productVariant });
}
