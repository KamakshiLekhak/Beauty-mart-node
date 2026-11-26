import type { NextFunction, Request, Response } from "express";
import { ZodAny, ZodError } from "zod";
import { ConflictError, HttpError } from "../error/httpErrors.ts";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    console.error(error);
    const errFormat = {
      error: "Invalid Input",
      description: error.issues.map((x) => {
        return { path: x.path.join("."), message: x.message };
      }),
    };

    return res.status(400).json(errFormat);
  }
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
  }
  console.error(error);
  res.status(500).json({ error: "Something went wrong" });
}
