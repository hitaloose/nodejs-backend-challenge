import { Post } from "@/models/post";

export type Values = Omit<Post, "id">;

export interface IPostRepository {
  insert(values: Values): Promise<Post>;
  update(id: string, values: Values): Promise<Post>;
  delete(id: string): Promise<void>;
  findByPageAndCountAll(
    page: number
  ): Promise<{ posts: Post[]; count: number }>;
  findById(id: string): Promise<Post | null>;
}
