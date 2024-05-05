import { HttpError } from "@/errors/HttpError";
import { IEncryptorProvider } from "@/providers/interfaces/IEncryptorProvider";
import { IHashserProvider } from "@/providers/interfaces/IHasherProvider";
import { IUserRepository } from "@/repositories/interfaces/IUserRepository";
import {
  ILogonService,
  Input,
  Output,
} from "@/services/interfaces/auth/ILogonService";

export class LogonService implements ILogonService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherProvider: IHashserProvider,
    private readonly encryptorProvider: IEncryptorProvider
  ) {}

  async run(input: Input): Promise<Output> {
    const { email, password, passwordConfirmation } = input;

    if (password !== passwordConfirmation) {
      throw new HttpError("passwords not match", 422);
    }

    const findedUser = await this.userRepository.findByEmail(email);
    if (findedUser) {
      throw new HttpError("user already exist", 422);
    }

    const passwordHashed = await this.hasherProvider.hash(password);
    const user = await this.userRepository.insert({
      email,
      passwordHashed,
    });

    const token = await this.encryptorProvider.encrypt({ id: user.id });

    return {
      user,
      token,
    };
  }
}
