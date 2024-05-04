import { IDeletePostService } from "@/services/interfaces/posts/IDeletePostService";

export class DeletePostServiceStub implements IDeletePostService {
  async run(): Promise<void> {
    return;
  }
}
