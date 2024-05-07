export const userSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    email: {
      type: "string",
    },
  },
  required: ["id", "email"],
};
