import { v4 as uuidv4 } from "uuid";

import { Post } from "@/models/post";

import { IPostRepository, Values } from "../interfaces/IPostRepository";
import { configs } from "@/helpers/configs";

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

  async findByPageAndCountAll(
    page: number
  ): Promise<{ posts: Post[]; count: number }> {
    const skip = (page - 1) * configs.PAGE_SIZE;
    const maxCounter = skip + configs.PAGE_SIZE;

    const posts = this.POSTS.filter((post, index) => {
      const counter = index + 1;

      if (counter > skip && counter <= maxCounter) return true;

      return false;
    });

    return { posts, count: this.POSTS.length };
  }
}
