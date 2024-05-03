import {
  IGetPostsService,
  Output,
} from "@/services/interfaces/posts/IGetPostsService";
import { mockPost } from "@test/mocks/models/mockPost";

export class GetPostsServiceStub implements IGetPostsService {
  async run(): Promise<Output> {
    return { posts: [mockPost()], maxPage: 1 };
  }
}
