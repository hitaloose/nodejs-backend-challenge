import { calculateMaxPage } from "@/helpers/page";
import { IPostRepository } from "@/repositories/interfaces/IPostRepository";
import {
  IGetPostsService,
  Input,
  Output,
} from "@/services/interfaces/posts/IGetPostsService";

export class GetPostsService implements IGetPostsService {
  constructor(private readonly postRepository: IPostRepository) {}

  async run(input: Input): Promise<Output> {
    const { page } = input;

    const { posts, count } = await this.postRepository.findByPageAndCountAll(
      page
    );
    const maxPage = calculateMaxPage(count);

    return { posts, maxPage };
  }
}
