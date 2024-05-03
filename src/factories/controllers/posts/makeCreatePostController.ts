import { CreatePostController } from "@/controllers/implementations/posts/CreatePostController/CreatePostController";
import { makeCreatePostService } from "@/factories/services/posts/makeCreatePostService";

export const makeCreatePostController = () => {
  return new CreatePostController(makeCreatePostService());
};
