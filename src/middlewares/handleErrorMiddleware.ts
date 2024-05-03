import { HttpError } from "@/errors/HttpError";
import { NextFunction, Response, ErrorRequestHandler, Request } from "express";
import { ValidationError } from "yup";

export const handleErrorMiddleware = (
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const message = error.errors.join(", ");

    response.status(400).json({ errorMessage: message });
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ errorMessage: error.message });
  }

  next();
};
