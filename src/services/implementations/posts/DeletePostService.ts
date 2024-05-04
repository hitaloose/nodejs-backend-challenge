import { IPostRepository } from "@/repositories/interfaces/IPostRepository";
import {
  IDeletePostService,
  Input,
} from "@/services/interfaces/posts/IDeletePostService";

export class DeletePostService implements IDeletePostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async run(input: Input): Promise<void> {
    await this.postRepository.delete(input.postId);
  }
}
