export const logonPath = {
  post: {
    tags: ["Autenticação"],
    summary: "API para cadastrar e autenticar usuário",
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
              passwordConfirmation: {
                type: "string",
              },
            },
            required: ["email", "password", "passwordConfirmation"],
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
