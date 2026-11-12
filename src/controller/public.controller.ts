import type { Request, Response } from "express";
import * as publicService from "../services/public.service.ts";
import { count } from "console";

export async function getBrands(req: Request, res: Response) {
  const brands = await publicService.getBrands();
  return res.status(200).json({ count: brands.length, data: brands });
}

export async function getCategories(req: Request, res: Response) {
  const categories = await publicService.getCategories();
  return res.status(200).json({ count: categories.length, data: categories });
}


