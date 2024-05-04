import { HttpResponse } from "@/controllers/interfaces/IController";

export const created = (body?: Record<string, unknown>): HttpResponse => ({
  statusCode: 201,
  body,
});

export const ok = (body?: Record<string, unknown>): HttpResponse => ({
  statusCode: 200,
  body,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
});
