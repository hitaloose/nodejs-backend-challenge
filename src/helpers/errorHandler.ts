import { HttpError } from "@/errors/HttpError";
import { NextFunction, Response, ErrorRequestHandler, Request } from "express";
import { ValidationError } from "yup";

export const errorHandler = (
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const message = error.errors.join(", ");

    response.status(400).json({ errorMessage: message });

    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ errorMessage: error.message });

    return;
  }

  if (error instanceof Error) {
    response.status(500).json({ errorMessage: error.message });

    return;
  }

  response.status(500).json({ errorMessage: "unknown error" });

  next();
};
