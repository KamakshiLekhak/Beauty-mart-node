import z from "zod";
import { commonStringValidation } from "./admin.schema.ts";

export const registerUserSchema = z
  .object({
    name: commonStringValidation,
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().trim().min(8).max(72),
    confirmPassword: z.string().trim().min(8).max(72),
  })
  .refine((x) => x.password === x.confirmPassword, {
    error: "Password didnot match",
    path: ["password"],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type UserSaveModel = {
  name: string;
  email: string;
  password: string;
};
