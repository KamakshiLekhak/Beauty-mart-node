import type { Request, Response } from "express";
import * as productService from "../services/productService.ts";

export async function getAllProducts(req: Request, res: Response) {
  const body = await productService.getAllProducts();
  return res.json({ data: body });
}
