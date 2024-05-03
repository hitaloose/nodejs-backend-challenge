import express from "express";
import { routes } from "routes/api";

export const app = express();

app.use(express.json());

app.use(routes);
