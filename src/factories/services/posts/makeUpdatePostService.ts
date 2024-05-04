import { makePostRepository } from "@/factories/repositories/makePostRepository";
import { UpdatePostService } from "@/services/implementations/posts/UpdatePostService";
import { IUpdatePostService } from "@/services/interfaces/posts/IUpdatePostService";

export const makeUpdatePostService = (): IUpdatePostService => {
  return new UpdatePostService(makePostRepository());
};
