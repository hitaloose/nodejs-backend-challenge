import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/controllers/interfaces/IController";
import { paramsValidator } from "./paramsValidator";
import { IDeletePostService } from "@/services/interfaces/posts/IDeletePostService";
import { noContent } from "@/helpers/http";

export class DeletePostController implements IController {
  constructor(private readonly deletePostService: IDeletePostService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const params = await paramsValidator(request.params);

    await this.deletePostService.run(params);

    return noContent();
  }
}
