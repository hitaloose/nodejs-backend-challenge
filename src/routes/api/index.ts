import { Router } from "express";

import { expressMiddlewareAdapter as middlewareAdapter } from "@/adapters/expressMiddlewareAdapter";

import { makeValidateTokenMiddleware } from "@/factories/middlewares/makeValidateTokenMiddleware";

import { postsRoutes } from "./posts";
import { authRoutes } from "./auth";

export const routes = Router();

routes.use(authRoutes);

routes.use(middlewareAdapter(makeValidateTokenMiddleware()));

routes.use("/posts", postsRoutes);
