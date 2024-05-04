import { HttpError } from "@/errors/HttpError";
import { IPostRepository } from "@/repositories/interfaces/IPostRepository";
import {
  IUpdatePostService,
  Input,
  Output,
} from "@/services/interfaces/posts/IUpdatePostService";

export class UpdatePostService implements IUpdatePostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async run(input: Input): Promise<Output> {
    const { postId, data } = input;

    const post = await this.postRepository.update(postId, data);

    return { post };
  }
}
