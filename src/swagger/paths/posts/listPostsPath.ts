export const listPostPath = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Posts"],
    summary: "API para listar posts",
    description: "Essa rota pode ser executada por **usuário autenticado**",
    parameters: [
      {
        in: "query",
        name: "page",
        required: true,
        schema: {
          type: "integer",
        },
      },
    ],
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                maxPage: {
                  type: "integer",
                },
                posts: {
                  type: "array",
                  items: {
                    type: "object",
                    $ref: "#/schemas/post",
                  },
                },
              },
            },
          },
        },
      },
      400: {
        $ref: "#/components/badRequest",
      },
      403: {
        $ref: "#/components/forbidden",
      },
      422: {
        $ref: "#/components/unprocessableEntity",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};
