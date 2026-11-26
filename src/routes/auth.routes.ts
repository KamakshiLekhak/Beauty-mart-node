import { Router } from "express";
import * as userController from "../controller/user.controller.ts"

export const authRouter = Router();

authRouter.post("/register", userController.registerUser)