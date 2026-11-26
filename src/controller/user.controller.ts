import type { Request, Response } from "express";
import { registerUserSchema } from "../schemas/auth.schema.ts";
import * as userService from "../services/user.service.ts";

export async function registerUser(req: Request, res: Response) {
  const body = registerUserSchema.parse(req.body);
  const registeredUser = await userService.registerUser(body);
  return res.json({ data: registeredUser });
}
