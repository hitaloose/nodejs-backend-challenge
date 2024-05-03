import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/controllers/interfaces/IController";
import { IGetPostsService } from "@/services/interfaces/posts/IGetPostsService";
import { queryValidator } from "./queryValidator";
import { ok } from "@/helpers/http";

export class GetPostsController implements IController {
  constructor(private readonly getPostsService: IGetPostsService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const query = await queryValidator(request.queries);

    const output = await this.getPostsService.run(query);

    return ok(output);
  }
}
