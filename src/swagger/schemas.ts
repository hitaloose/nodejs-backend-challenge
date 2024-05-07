import { errorSchema } from "./schemas/error";
import { postSchema } from "./schemas/post";
import { userSchema } from "./schemas/user";

export const schemas = {
  user: userSchema,
  error: errorSchema,
  post: postSchema,
};
