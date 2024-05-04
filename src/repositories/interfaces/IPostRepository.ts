import { Post } from "@/models/post";

export type Values = Omit<Post, "id">;

export interface IPostRepository {
  insert(values: Values): Promise<Post>;
  findByPageAndCountAll(
    page: number
  ): Promise<{ posts: Post[]; count: number }>;
  findById(id: string): Promise<Post | null>;
}
