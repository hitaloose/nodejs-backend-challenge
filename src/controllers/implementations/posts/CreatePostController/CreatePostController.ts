import { ICreatePostService } from "@/services/interfaces/posts/ICreatePostService";

import { bodyValidator } from "./bodyValidator";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/controllers/interfaces/IController";
import { created } from "@/helpers/http";

export class CreatePostController implements IController {
  constructor(private readonly createPostService: ICreatePostService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = await bodyValidator(request.body);

    const output = await this.createPostService.run(body);

    return created(output);
  }
}
