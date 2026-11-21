import type { Request, Response } from "express";
import * as productService from "../services/productService.ts";
import { productFilterSchema } from "../schemas/product.schema.ts";

export async function getAllProducts(req: Request, res: Response) {
  const body = await productService.getAllProducts();
  return res.json({ data: body });
}

export async function filterPaginatedProducts(req: Request, res: Response) {
  const query = productFilterSchema.parse(req.query);
  const data = await productService.filterPaginatedProducts(query);
  return res.json({ data: data });
}
