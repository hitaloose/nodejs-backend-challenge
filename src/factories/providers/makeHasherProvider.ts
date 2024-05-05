import { configs } from "@/helpers/configs";
import { BcryptHasherProvider } from "@/providers/implementations/BcryptHasherProvider";
import { IHashserProvider } from "@/providers/interfaces/IHasherProvider";

export const makeHasherProvider = (): IHashserProvider => {
  return new BcryptHasherProvider(configs.BCRYPT_SALTS);
};
