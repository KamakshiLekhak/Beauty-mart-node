import type { Request, Response } from "express";
import * as productVariantService from "../services/productVariant.service.ts";

export async function getAllProductVariant(req: Request, res: Response) {
  const productVariant = await productVariantService.getAllProductVariant();
  res.json({ data: productVariant });
}
