import { Router } from "express";
import { getAllProductVariant } from "../controller/productVariant.controller.ts";

export const productVariantRouter = Router();
productVariantRouter.get("/", getAllProductVariant);
