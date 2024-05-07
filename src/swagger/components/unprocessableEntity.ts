export const unprocessableEntity = {
  description: "Quebra da regra de négocio",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/error",
      },
    },
  },
};
