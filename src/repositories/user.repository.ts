import { prisma } from "../config/prisma.ts";
import type { UserSaveModel } from "../schemas/auth.schema.ts";

export async function insertUser(data: UserSaveModel) {
  return await prisma.user.create({
    data,
    select: { id: true, name: true, email: true, role: true },
  });
}

export async function emailExists(email: string) {
  const count = await prisma.user.count({ where: { email } });
  return count !== 0;
}
