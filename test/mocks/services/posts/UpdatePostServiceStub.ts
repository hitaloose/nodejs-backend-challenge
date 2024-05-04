import {
  IUpdatePostService,
  Output,
} from "@/services/interfaces/posts/IUpdatePostService";
import { mockPost } from "@test/mocks/models/mockPost";

export class UpdatePostServiceStub implements IUpdatePostService {
  async run(): Promise<Output> {
    return { post: mockPost() };
  }
}
