import { Router } from "express";
import * as adminController from "../controller/admin.controller.ts";

export const adminRouter = Router();

adminRouter.post("/category", adminController.addCategory);
adminRouter.post("/brand", adminController.addBrand);
adminRouter.put("/brand/:id", adminController.updateBrand);
adminRouter.put("/category/:id", adminController.updateCategory);
