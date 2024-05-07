import { configs } from "@/helpers/configs";
import { InMemoryUserRepository } from "@/repositories/implementations/InMemoryUserRepository";
import { TypeORMUserRepository } from "@/repositories/implementations/TypeORMUserRepository";
import { IUserRepository } from "@/repositories/interfaces/IUserRepository";

export const makeUserRepository = (): IUserRepository => {
  if (configs.REPO_IMPL === "typeorm") {
    return new TypeORMUserRepository();
  }

  return new InMemoryUserRepository();
};
