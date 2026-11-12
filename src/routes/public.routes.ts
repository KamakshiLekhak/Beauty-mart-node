import { Router } from "express";
import * as publicController from "../controller/public.controller.ts";

export const publicRouter = Router();
publicRouter.get("/brand", publicController.getBrands);
publicRouter.get("/category", publicController.getCategories);
