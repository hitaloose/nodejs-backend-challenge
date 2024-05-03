import { Post } from "@/models/post";

export type Values = Omit<Post, "id">;

export interface IPostRepository {
  insert(values: Values): Promise<Post>;
}
