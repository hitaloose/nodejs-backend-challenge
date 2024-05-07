export const loginPath = {
  post: {
    tags: ["Autenticação"],
    summary: "API para autenticar usuário",
    description: "Essa rota pode ser executada por **qualquer usuário**",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
            required: ["email", "password"],
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
                user: {
                  type: "object",
                  $ref: "#/schemas/user",
                },
                token: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      400: {
        $ref: "#/components/badRequest",
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
