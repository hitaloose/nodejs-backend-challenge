import { HttpResponse } from "@/controllers/interfaces/IController";

export const created = (body?: Record<string, unknown>): HttpResponse => ({
  statusCode: 201,
  body,
});
