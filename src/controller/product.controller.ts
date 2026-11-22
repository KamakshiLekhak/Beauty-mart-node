import type { Request, Response } from "express";
import * as productService from "../services/productService.ts";
import { productFilterSchema } from "../schemas/product.schema.ts";
import { idSchemaInUrl } from "../schemas/admin.schema.ts";

export async function getAllProducts(req: Request, res: Response) {
  const body = await productService.getAllProducts();
  return res.json({ data: body });
}

export async function filterPaginatedProducts(req: Request, res: Response) {
  const query = productFilterSchema.parse(req.query);
  const data = await productService.filterPaginatedProducts(query);
  return res.json({ data: data });
}

export async function getProductInDetail(req: Request, res: Response) {
  const id = idSchemaInUrl.parse(req.params.id);
  const productInDetail = await productService.getProductInDetail(id);
  return res.json({ data: productInDetail });
}
