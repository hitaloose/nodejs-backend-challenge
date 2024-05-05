import { User } from "@/models/user";
import {
  IUserRepository,
  Values,
} from "@/repositories/interfaces/IUserRepository";
import { mockUser } from "../models/mockUser";

export class UserRepositoryStub implements IUserRepository {
  async insert(values: Values): Promise<User> {
    return mockUser(values);
  }

  async findByEmail(email: string): Promise<User | null> {
    return mockUser({ email });
  }
}
