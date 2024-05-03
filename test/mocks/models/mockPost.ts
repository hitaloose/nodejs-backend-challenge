import { Post } from "models/post";

export const mockPost = (override?: Partial<Post>): Post => {
  return {
    id: "",
    body: "",
    tags: [""],
    title: "",
    ...override,
  };
};
