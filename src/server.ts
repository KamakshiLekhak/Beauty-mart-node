import express from "express";
import { env } from "./config/env.ts";
import { notFound } from "./middlewares/notFound.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
const app = express();

app.use(express.json()); //json expect garnu bhanera, immediately garne ater above line

app.get("/", (req, res) => {
  res.json({ name: "Poku Beauty Mart" });
});



app.use((req, res) => {
  res.status(404).json({ error: notFound(req, res) });
});

app.use(errorHandler);
app.listen(env.port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running at ${env.port}`);
});
