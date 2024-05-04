import { v4 as uuidv4 } from "uuid";

import { Post } from "@/models/post";

import { IPostRepository, Values } from "../interfaces/IPostRepository";
import { configs } from "@/helpers/configs";

export class InMemoryPostRepository implements IPostRepository {
  static POSTS: Post[] = [];

  async insert(values: Values): Promise<Post> {
    const createdPost = {
      id: uuidv4(),
      ...values,
    };

    InMemoryPostRepository.POSTS.push(createdPost);

    return createdPost;
  }

  async findById(id: string): Promise<Post | null> {
    const post = InMemoryPostRepository.POSTS.find((item) => item.id === id);

    return post || null;
  }

  async findByPageAndCountAll(
    page: number
  ): Promise<{ posts: Post[]; count: number }> {
    const skip = (page - 1) * configs.PAGE_SIZE;
    const maxCounter = skip + configs.PAGE_SIZE;

    const posts = InMemoryPostRepository.POSTS.filter((post, index) => {
      const counter = index + 1;

      if (counter > skip && counter <= maxCounter) return true;

      return false;
    });

    return { posts, count: InMemoryPostRepository.POSTS.length };
  }
}
