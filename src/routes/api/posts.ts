import { Router } from "express";

import { makeCreatePostController } from "@/factories/controllers/posts/makeCreatePostController";
import { expressControllerAdapter as adapt } from "@/adapters/expressControllerAdapter";

export const postsRoutes = Router();

postsRoutes.post("/", adapt(makeCreatePostController()));
