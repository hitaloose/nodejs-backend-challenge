import {
  ICreatePostService,
  Output,
} from "@/services/interfaces/posts/ICreatePostService";
import { mockPost } from "@test/mocks/models/mockPost";

export class CreatePostServiceStub implements ICreatePostService {
  async run(): Promise<Output> {
    return { post: mockPost() };
  }
}
