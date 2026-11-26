import type { RegisterUserInput } from "../schemas/auth.schema.ts";
import * as userRepository from "../repositories/user.repository.ts";
import bcrypt from "bcrypt";
import { ConflictError } from "../error/httpErrors.ts";

const BCRYPT_COST = 12;
export async function registerUser(userModel: RegisterUserInput) {
  const existingEmail = await userRepository.emailExists(userModel.email);
  if (existingEmail) {
    throw new ConflictError("This email already exists");
  }
  const hash = await bcrypt.hash(userModel.password, BCRYPT_COST);
  const userToBeSaved = {
    name: userModel.name,
    password: hash,
    email: userModel.email,
  };

  return await userRepository.insertUser(userToBeSaved);
}
