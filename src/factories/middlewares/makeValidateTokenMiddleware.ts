import { ValidateTokenMiddleware } from "@/middlewares/implementations/ValidateTokenMiddleware";
import { makeValidateTokenService } from "../services/auth/makeValidateTokenService";

export const makeValidateTokenMiddleware = () => {
  return new ValidateTokenMiddleware(makeValidateTokenService());
};
