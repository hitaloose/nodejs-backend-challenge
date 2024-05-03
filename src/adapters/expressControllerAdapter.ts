import { Request, Response } from "express";

import { IController } from "@/controllers/interfaces/IController";

export const expressControllerAdapter =
  (controller: IController) => async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
      headers: request.headers,
      params: request.params,
      queries: request.query,
    });

    response.status(statusCode).json(body);
  };
