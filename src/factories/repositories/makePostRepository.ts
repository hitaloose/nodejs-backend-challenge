import { InMemoryPostRepository } from "@/repositories/implementations/InMemoryPostRepository";
import { IPostRepository } from "@/repositories/interfaces/IPostRepository";

export const makePostRepository = (): IPostRepository => {
  return new InMemoryPostRepository();
};
