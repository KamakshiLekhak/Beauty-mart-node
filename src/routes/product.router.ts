import { Router } from "express";
import * as productController from "../controller/product.controller.ts";

export const productRouter = Router();
productRouter.get("/", productController.getAllProducts);
productRouter.get("/detail/:id", productController.getProductInDetail);
productRouter.get("/filter", productController.filterPaginatedProducts);

