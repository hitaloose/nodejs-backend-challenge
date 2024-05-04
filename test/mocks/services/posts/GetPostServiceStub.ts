import {
  IGetPostService,
  Input,
  Output,
} from "@/services/interfaces/posts/IGetPostService";
import { mockPost } from "@test/mocks/models/mockPost";

export class GetPostServiceStub implements IGetPostService {
  async run(input: Input): Promise<Output> {
    const { postId } = input;

    return { post: mockPost({ id: postId }) };
  }
}
