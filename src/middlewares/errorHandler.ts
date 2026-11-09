import type { NextFunction, Request, Response } from "express";
import { ZodAny, ZodError } from "zod";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    const errFormat = {
      error: "Invalid Input",
      description: error.issues.map((x) => {
        return { path: x.path.join(), message: x.message };
      }),
    };
    return res.status(400).json(errFormat);
  }
  console.error(error);
  res.status(500).json({ error: "Something went wrong" });
}
