import { Router } from "express";

import { posts } from "./posts";

export const routes = Router();

routes.use(posts);
