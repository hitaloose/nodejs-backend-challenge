import "express-async-errors";

import express from "express";
import cors from "cors";

import { routes } from "./routes/api";
import { handleErrorMiddleware } from "./middlewares/handleErrorMiddleware";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.use(handleErrorMiddleware);
