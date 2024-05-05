import { makeEncryptorProvider } from "@/factories/providers/makeEncryptorProvider";
import { makeHasherProvider } from "@/factories/providers/makeHasherProvider";
import { makeUserRepository } from "@/factories/repositories/makeUserRepository";
import { LoginService } from "@/services/implementations/auth/LoginService";
import { ILoginService } from "@/services/interfaces/auth/ILoginService";

export const makeLoginService = (): ILoginService => {
  return new LoginService(
    makeUserRepository(),
    makeHasherProvider(),
    makeEncryptorProvider()
  );
};
