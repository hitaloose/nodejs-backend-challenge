import { makeEncryptorProvider } from "@/factories/providers/makeEncryptorProvider";
import { makeUserRepository } from "@/factories/repositories/makeUserRepository";
import { ValidateTokenService } from "@/services/implementations/auth/ValidateTokenService";
import { IValidateTokenService } from "@/services/interfaces/auth/IValidateTokenService";

export const makeValidateTokenService = (): IValidateTokenService => {
  return new ValidateTokenService(
    makeEncryptorProvider(),
    makeUserRepository()
  );
};
