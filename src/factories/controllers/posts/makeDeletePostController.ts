import { DeletePostController } from "@/controllers/implementations/posts/DeletePostController/DeletePostController";
import { makeDeletePostService } from "@/factories/services/posts/makeDeletePostService";

export const makeDeletePostController = () => {
  return new DeletePostController(makeDeletePostService());
};
