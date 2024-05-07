export const createPostPath = {
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Posts"],
    summary: "API para cadastrar posts",
    description: "Essa rota pode ser executada por **usuário autenticado**",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              body: {
                type: "string",
              },
              tags: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["title", "body", "tags"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Criado",
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
      422: {
        $ref: "#/components/unprocessableEntity",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};
