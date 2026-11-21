import { Router } from "express";
import * as productController from "../controller/product.controller.ts";

export const productRouter = Router();
productRouter.get("/", productController.getAllProducts);
productRouter.get("/filter", productController.filterPaginatedProducts);
