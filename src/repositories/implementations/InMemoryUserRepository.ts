import { v4 as uuidv4 } from "uuid";

import { User } from "@/models/user";
import { IUserRepository, Values } from "../interfaces/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  static USERS: User[] = [];

  async insert(values: Values): Promise<User> {
    const createdUser = {
      id: uuidv4(),
      ...values,
    };

    InMemoryUserRepository.USERS.push(createdUser);

    return createdUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = InMemoryUserRepository.USERS.find(
      (item) => item.email === email
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = InMemoryUserRepository.USERS.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
