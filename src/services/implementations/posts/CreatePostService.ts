import { IPostRepository } from "repositories/interfaces/IPostRepository";
import {
  ICreatePostService,
  Input,
  Output,
} from "services/interfaces/posts/ICreatePostService";

export class CreatePostService implements ICreatePostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async run(input: Input): Promise<Output> {
    const createdPost = await this.postRepository.insert(input);

    return { post: createdPost };
  }
}
