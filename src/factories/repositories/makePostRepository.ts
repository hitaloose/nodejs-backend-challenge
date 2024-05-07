import { configs } from "@/helpers/configs";
import { InMemoryPostRepository } from "@/repositories/implementations/InMemoryPostRepository";
import { TypeORMPostRepository } from "@/repositories/implementations/TypeORMPostRepository";
import { IPostRepository } from "@/repositories/interfaces/IPostRepository";

export const makePostRepository = (): IPostRepository => {
  if (configs.REPO_IMPL === "typeorm") {
    return new TypeORMPostRepository();
  }

  return new InMemoryPostRepository();
};
