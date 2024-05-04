import { GetPostController } from "@/controllers/implementations/posts/GetPostController/GetPostController";
import { makeGetPostService } from "@/factories/services/posts/makeGetPostService";

export const makeGetPostController = () => {
  return new GetPostController(makeGetPostService());
};
