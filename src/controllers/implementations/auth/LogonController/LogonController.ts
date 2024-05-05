import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/controllers/interfaces/IController";
import { ILogonService } from "@/services/interfaces/auth/ILogonService";
import { created } from "@/helpers/http";

import { bodyValidator } from "./bodyValidator";

export class LogonController implements IController {
  constructor(private readonly logonService: ILogonService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = await bodyValidator(request.body);

    const output = await this.logonService.run(body);

    return created(output);
  }
}
