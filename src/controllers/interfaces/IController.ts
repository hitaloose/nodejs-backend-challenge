export type HttpRequest = {
  params?: Record<string, unknown>;
  queries?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  body?: Record<string, unknown>;
};

export type HttpResponse = {
  statusCode: number;
  body?: Record<string, unknown>;
};

export interface IController {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
