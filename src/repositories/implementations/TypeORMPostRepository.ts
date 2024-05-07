import { Repository } from "typeorm";

import { Post } from "@/models/post";
import { IPostRepository, Values } from "../interfaces/IPostRepository";
import { database } from "@/helpers/database";
import { HttpError } from "@/errors/HttpError";
import { configs } from "@/helpers/configs";

export class TypeORMPostRepository implements IPostRepository {
  constructor() {
    this.postRepository = database.getRepository(Post);
  }

  private postRepository: Repository<Post>;

  async insert(values: Values): Promise<Post> {
    const post = this.postRepository.create(values);
    await this.postRepository.save(post);

    return post;
  }

  async update(id: string, values: Values): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new HttpError(`post with id ${id} not found`, 404);
    }

    Object.assign(post, values);

    await this.postRepository.save(post);

    return post;
  }

  async delete(id: string): Promise<void> {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new HttpError(`post with id ${id} not found`, 404);
    }

    await this.postRepository.remove(post);
  }

  async findByPageAndCountAll(
    page: number
  ): Promise<{ posts: Post[]; count: number }> {
    const skip = (page - 1) * configs.PAGE_SIZE;

    const [posts, count] = await this.postRepository.findAndCount({
      skip,
      take: configs.PAGE_SIZE,
    });

    return { posts, count };
  }

  async findById(id: string): Promise<Post | null> {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      return null;
    }

    return post;
  }
}
