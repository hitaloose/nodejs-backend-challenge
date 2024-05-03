import { Router } from "express";

import { postsRoutes } from "./posts";

export const routes = Router();

routes.use("/posts", postsRoutes);
