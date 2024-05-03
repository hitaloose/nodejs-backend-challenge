import { Post } from "@/models/post";
import {
  IPostRepository,
  Values,
} from "@/repositories/interfaces/IPostRepository";
import { mockPost } from "../models/mockPost";

export class PostRepositoryStub implements IPostRepository {
  async insert(values: Values): Promise<Post> {
    return mockPost(values);
  }
  async findByPageAndCountAll(): Promise<{ posts: Post[]; count: number }> {
    return { posts: [mockPost()], count: 1 };
  }
}
