import { Router } from "express";

import { expressControllerAdapter as adapt } from "@/adapters/expressControllerAdapter";

import { makeCreatePostController } from "@/factories/controllers/posts/makeCreatePostController";
import { makeGetPostsController } from "@/factories/controllers/posts/makeGetPostsController";

export const postsRoutes = Router();

postsRoutes.get("/", adapt(makeGetPostsController()));
postsRoutes.post("/", adapt(makeCreatePostController()));
