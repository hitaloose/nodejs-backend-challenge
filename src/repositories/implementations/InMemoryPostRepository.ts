import { v4 as uuidv4 } from "uuid";

import { Post } from "@/models/post";

import { IPostRepository, Values } from "../interfaces/IPostRepository";

export class InMemoryPostRepository implements IPostRepository {
  private POSTS: Post[] = [];

  async insert(values: Values): Promise<Post> {
    const createdPost = {
      id: uuidv4(),
      ...values,
    };

    this.POSTS.push(createdPost);

    return createdPost;
  }
}
