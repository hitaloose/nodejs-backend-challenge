import { HttpError } from "@/errors/HttpError";
import { IEncryptorProvider } from "@/providers/interfaces/IEncryptorProvider";
import { IHashserProvider } from "@/providers/interfaces/IHasherProvider";
import { IUserRepository } from "@/repositories/interfaces/IUserRepository";
import {
  ILoginService,
  Input,
  Output,
} from "@/services/interfaces/auth/ILoginService";

export class LoginService implements ILoginService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherProvider: IHashserProvider,
    private readonly encryptorProvider: IEncryptorProvider
  ) {}

  async run(input: Input): Promise<Output> {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpError("user not found", 422);
    }

    const passwordIsValid = await this.hasherProvider.compare(
      password,
      user.passwordHashed
    );
    if (!passwordIsValid) {
      throw new HttpError("password invalid", 422);
    }

    const token = await this.encryptorProvider.encrypt({ id: user.id });

    return {
      user,
      token,
    };
  }
}
