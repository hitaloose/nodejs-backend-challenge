export type HttpRequest = {
  params?: Record<string, unknown>;
  queries?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  body?: Record<string, unknown>;
};

export type HttpResponse = {
  success: boolean;
  body?: Record<string, unknown>;
};

export interface IMiddleware {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
