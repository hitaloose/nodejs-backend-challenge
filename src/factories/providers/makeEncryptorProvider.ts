import { configs } from "@/helpers/configs";
import { JwtEncryptorProvider } from "@/providers/implementations/JwtEncryptorProvider";
import { IEncryptorProvider } from "@/providers/interfaces/IEncryptorProvider";

export const makeEncryptorProvider = (): IEncryptorProvider => {
  return new JwtEncryptorProvider(configs.JWT_SECRET);
};
