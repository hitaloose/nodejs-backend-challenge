export const getPostPath = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Posts"],
    summary: "API para obter post",
    description: "Essa rota pode ser executada por **usuário autenticado**",
    parameters: [
      {
        in: "path",
        name: "postId",
        required: true,
        schema: {
          type: "string",
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
                post: {
                  type: "object",
                  $ref: "#/schemas/post",
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
      404: {
        $ref: "#/components/notFound",
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
