import { Router } from "express";

import { makeCreatePostController } from "@/factories/controllers/posts/makeCreatePostController";
import { adaptController } from "@/helpers/adaptController";

export const postsRoutes = Router();

postsRoutes.post("/", adaptController(makeCreatePostController()));
