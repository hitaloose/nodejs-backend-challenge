import { InMemoryUserRepository } from "@/repositories/implementations/InMemoryUserRepository";
import { IUserRepository } from "@/repositories/interfaces/IUserRepository";

export const makeUserRepository = (): IUserRepository => {
  return new InMemoryUserRepository();
};
