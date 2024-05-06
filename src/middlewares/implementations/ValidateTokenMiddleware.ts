import { IValidateTokenService } from "@/services/interfaces/auth/IValidateTokenService";
import {
  HttpRequest,
  HttpResponse,
  IMiddleware,
} from "../interfaces/IMiddleware";
import { HttpError } from "@/errors/HttpError";

export class ValidateTokenMiddleware implements IMiddleware {
  constructor(private validateTokenService: IValidateTokenService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const bearerToken = request.headers?.authorization as string;
    if (!bearerToken) {
      throw new HttpError("token is not provided", 400);
    }

    const [prefix, token] = bearerToken.split(" ");

    if (prefix.toLowerCase() !== "bearer") {
      throw new HttpError("invalid token", 403);
    }

    const output = await this.validateTokenService.run({ token });

    return { success: true, body: output };
  }
}
