import type { Request, Response } from "express";
import {
  brandRequestSchema,
  categoryRequestSchema,
  idSchema,
  updateBrandSchema,
  updateCategorySchema,
} from "../schemas/admin.schema.ts";
import * as adminService from "../services/admin.service.ts";

export async function addCategory(req: Request, res: Response) {
  const body = categoryRequestSchema.parse(req.body);
  return await adminService.addCategory(body);
}

export async function addBrand(req: Request, res: Response) {
  const body = brandRequestSchema.parse(req.body);
  return await adminService.addBrand(body);
}

export async function updateBrand(req: Request, res: Response) {
  const id = idSchema.parse(req.params.id);
  const body = updateBrandSchema.parse(req.body);
  const updatedBrand = await adminService.updateBrand(id, body);
  if (!updatedBrand) {
    return res.status(404).json({ message: "The brand doesnot exist" });
  }
  return res.status(200).json({ data: updatedBrand });
}

export async function updateCategory(req: Request, res: Response) {
  const id = idSchema.parse(req.params.id);
  const body = updateCategorySchema.parse(req.body);
  const updatedCategory = await adminService.updateCategory(id, body);
  if (!updatedCategory) {
    res.status(404).json("This category doesnot exist");
  }
  return res.status(200).json({ data: updatedCategory });
}
