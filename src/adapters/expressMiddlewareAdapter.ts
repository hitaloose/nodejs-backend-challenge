import { Request, Response, NextFunction } from "express";

import { IMiddleware } from "@/middlewares/interfaces/IMiddleware";

export const expressMiddlewareAdapter =
  (middleware: IMiddleware) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const { success, body } = await middleware.handle({
      body: request.body,
      headers: request.headers,
      params: request.params,
      queries: request.query,
    });

    if (success) {
      Object.assign(request, body);
    }

    next();
  };
