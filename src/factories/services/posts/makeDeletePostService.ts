import { makePostRepository } from "@/factories/repositories/makePostRepository";
import { DeletePostService } from "@/services/implementations/posts/DeletePostService";
import { IDeletePostService } from "@/services/interfaces/posts/IDeletePostService";

export const makeDeletePostService = (): IDeletePostService => {
  return new DeletePostService(makePostRepository());
};
