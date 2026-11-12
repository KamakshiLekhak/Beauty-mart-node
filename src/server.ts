import express from "express";
import { env } from "./config/env.ts";
import { notFound } from "./middlewares/notFound.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { Prisma } from "./generated/prisma/client.ts";
import { prisma } from "./config/prisma.ts";
import { adminRouter } from "./routes/admin.routes.ts";
import { publicRouter } from "./routes/public.routes.ts";
const app = express();

app.use(express.json()); //json expect garnu bhanera, immediately garne ater above line

app.get("/", (req, res) => {
  res.json({ name: "Poku Beauty Mart" });
});

app.use("/admin", adminRouter);
app.use("/", publicRouter);

app.use(notFound);

app.use(errorHandler);
await prisma.$queryRaw`SELECT 1`;
console.log("Connected to database");

app.listen(env.port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running at ${env.port}`);
});
