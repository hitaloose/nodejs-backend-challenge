export const errorSchema = {
  type: "object",
  properties: {
    errorMessage: {
      type: "string",
    },
  },
  required: ["errorMessage"],
};
