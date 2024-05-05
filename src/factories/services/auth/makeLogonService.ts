import { makeEncryptorProvider } from "@/factories/providers/makeEncryptorProvider";
import { makeHasherProvider } from "@/factories/providers/makeHasherProvider";
import { makeUserRepository } from "@/factories/repositories/makeUserRepository";
import { LogonService } from "@/services/implementations/auth/LogonService";
import { ILogonService } from "@/services/interfaces/auth/ILogonService";

export const makeLogonService = (): ILogonService => {
  return new LogonService(
    makeUserRepository(),
    makeHasherProvider(),
    makeEncryptorProvider()
  );
};
