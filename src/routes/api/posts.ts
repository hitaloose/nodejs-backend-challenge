import { Router } from "express";

import { expressControllerAdapter as adapt } from "@/adapters/expressControllerAdapter";

import { makeCreatePostController } from "@/factories/controllers/posts/makeCreatePostController";
import { makeGetPostsController } from "@/factories/controllers/posts/makeGetPostsController";
import { makeGetPostController } from "@/factories/controllers/posts/makeGetPostController";
import { makeUpdatePostController } from "@/factories/controllers/posts/makeUpdatePostController";
import { makeDeletePostController } from "@/factories/controllers/posts/makeDeletePostController";

export const postsRoutes = Router();

postsRoutes.get("/", adapt(makeGetPostsController()));
postsRoutes.post("/", adapt(makeCreatePostController()));
postsRoutes.get("/:postId", adapt(makeGetPostController()));
postsRoutes.put("/:postId", adapt(makeUpdatePostController()));
postsRoutes.delete("/:postId", adapt(makeDeletePostController()));
