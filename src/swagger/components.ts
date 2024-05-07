import { badRequest } from "./components/badRequest";
import { forbidden } from "./components/forbidden";
import { notFound } from "./components/notFound";
import { securitySchemes } from "./components/securitySchemes";
import { serverError } from "./components/serverError";
import { unprocessableEntity } from "./components/unprocessableEntity";

export const components = {
  badRequest,
  serverError,
  unprocessableEntity,
  forbidden,
  notFound,
  securitySchemes,
};
