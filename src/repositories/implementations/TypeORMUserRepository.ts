import { Repository } from "typeorm";

import { User } from "@/models/user";
import { IUserRepository, Values } from "../interfaces/IUserRepository";
import { database } from "@/helpers/database";

export class TypeORMUserRepository implements IUserRepository {
  constructor() {
    this.userRepository = database.getRepository(User);
  }

  private userRepository: Repository<User>;

  async insert(values: Values): Promise<User> {
    const user = this.userRepository.create(values);
    await this.userRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) return null;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return null;

    return user;
  }
}
