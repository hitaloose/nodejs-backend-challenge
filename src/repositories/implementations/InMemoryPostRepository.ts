import { v4 as uuidv4 } from "uuid";

import { Post } from "@/models/post";

import { IPostRepository, Values } from "../interfaces/IPostRepository";
import { configs } from "@/helpers/configs";
import { HttpError } from "@/errors/HttpError";

export class InMemoryPostRepository implements IPostRepository {
  static POSTS: Post[] = [];

  async delete(id: string): Promise<void> {
    const index = InMemoryPostRepository.POSTS.findIndex(
      (item) => item.id === id
    );

    if (index < 0) {
      throw new HttpError(`post with id ${id} not found`, 404);
    }

    InMemoryPostRepository.POSTS.splice(index, 1);
  }

  async update(id: string, values: Values): Promise<Post> {
    const post = await this.findById(id);

    if (!post) {
      throw new HttpError(`post with id ${id} not found`, 404);
    }

    post.title = values.title;
    post.body = values.body;
    post.tags = values.tags;

    return post;
  }

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
