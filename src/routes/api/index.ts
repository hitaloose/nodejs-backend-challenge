import { Router } from "express";

import { postsRoutes } from "./posts";
import { authRoutes } from "./auth";

export const routes = Router();

routes.use(authRoutes);

routes.use("/posts", postsRoutes);
