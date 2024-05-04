import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/controllers/interfaces/IController";
import { paramsValidator } from "./paramsValidator";
import { IGetPostService } from "@/services/interfaces/posts/IGetPostService";
import { ok } from "@/helpers/http";

export class GetPostController implements IController {
  constructor(private readonly getPostService: IGetPostService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const params = await paramsValidator(request.params);

    const output = await this.getPostService.run(params);

    return ok(output);
  }
}
