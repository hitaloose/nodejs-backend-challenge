import { makePostRepository } from "@/factories/repositories/makePostRepository";
import { CreatePostService } from "@/services/implementations/posts/CreatePostService";
import { ICreatePostService } from "@/services/interfaces/posts/ICreatePostService";

export const makeCreatePostService = (): ICreatePostService => {
  return new CreatePostService(makePostRepository());
};
