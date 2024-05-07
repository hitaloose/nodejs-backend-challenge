export const deletePostPath = {
  delete: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Posts"],
    summary: "API para deletar post",
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
      204: {
        description: "Sucesso (Sem Conteúdo)",
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
