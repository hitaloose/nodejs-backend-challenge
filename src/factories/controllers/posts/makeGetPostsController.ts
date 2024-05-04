import { GetPostsController } from "@/controllers/implementations/posts/GetPostsController/GetPostsController";
import { makeGetPostsService } from "@/factories/services/posts/makeGetPostsService";

export const makeGetPostsController = () => {
  return new GetPostsController(makeGetPostsService());
};
