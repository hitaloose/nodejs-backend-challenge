import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/controllers/interfaces/IController";
import { ILoginService } from "@/services/interfaces/auth/ILoginService";
import { ok } from "@/helpers/http";

import { bodyValidator } from "./bodyValidator";

export class LoginController implements IController {
  constructor(private readonly loginService: ILoginService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = await bodyValidator(request.body);

    const output = await this.loginService.run(body);

    return ok(output);
  }
}
