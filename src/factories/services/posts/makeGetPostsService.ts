import { makePostRepository } from "@/factories/repositories/makePostRepository";
import { GetPostsService } from "@/services/implementations/posts/GetPostsService";
import { IGetPostsService } from "@/services/interfaces/posts/IGetPostsService";

export const makeGetPostsService = (): IGetPostsService => {
  return new GetPostsService(makePostRepository());
};
