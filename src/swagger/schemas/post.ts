export const postSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
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
  required: ["id", "title", "body", "tags"],
};
