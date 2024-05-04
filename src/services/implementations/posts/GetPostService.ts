import { HttpError } from "@/errors/HttpError";
import { IPostRepository } from "@/repositories/interfaces/IPostRepository";
import {
  IGetPostService,
  Input,
  Output,
} from "@/services/interfaces/posts/IGetPostService";

export class GetPostService implements IGetPostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async run(input: Input): Promise<Output> {
    const { postId } = input;

    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new HttpError(`post with id ${postId} not found`, 404);
    }

    return { post };
  }
}
