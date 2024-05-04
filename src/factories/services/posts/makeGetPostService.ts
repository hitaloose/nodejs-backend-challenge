import { makePostRepository } from "@/factories/repositories/makePostRepository";
import { GetPostService } from "@/services/implementations/posts/GetPostService";
import { IGetPostService } from "@/services/interfaces/posts/IGetPostService";

export const makeGetPostService = (): IGetPostService => {
  return new GetPostService(makePostRepository());
};
