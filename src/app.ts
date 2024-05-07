import "express-async-errors";
import "reflect-metadata";

import express from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";

import { routes } from "./routes/api";

import { errorHandler } from "./helpers/errorHandler";
import { document } from "./swagger/document";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.use("/api-docs", serve, setup(document));

app.use(errorHandler);
