export const updatePostPath = {
  put: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Posts"],
    summary: "API para atualizar post",
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
