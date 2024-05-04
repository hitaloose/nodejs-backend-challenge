import { UpdatePostController } from "@/controllers/implementations/posts/UpdatePostController/UpdatePostController";
import { makeUpdatePostService } from "@/factories/services/posts/makeUpdatePostService";

export const makeUpdatePostController = () => {
  return new UpdatePostController(makeUpdatePostService());
};
