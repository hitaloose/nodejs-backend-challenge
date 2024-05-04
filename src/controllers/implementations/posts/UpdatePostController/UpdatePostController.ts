import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/controllers/interfaces/IController";
import { IUpdatePostService } from "@/services/interfaces/posts/IUpdatePostService";
import { ok } from "@/helpers/http";

import { paramsValidator } from "./paramsValidator";
import { bodyValidator } from "./bodyValidator";

export class UpdatePostController implements IController {
  constructor(private readonly updatePostService: IUpdatePostService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { postId } = await paramsValidator(request.params);
    const data = await bodyValidator(request.body);

    const output = await this.updatePostService.run({ postId, data });

    return ok(output);
  }
}
