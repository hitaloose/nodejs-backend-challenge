import { User } from "@/models/user";

export type Values = Omit<User, "id">;

export interface IUserRepository {
  insert(values: Values): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
