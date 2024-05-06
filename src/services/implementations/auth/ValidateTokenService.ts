import { HttpError } from "@/errors/HttpError";
import { IEncryptorProvider } from "@/providers/interfaces/IEncryptorProvider";
import { IUserRepository } from "@/repositories/interfaces/IUserRepository";
import {
  IValidateTokenService,
  Input,
  Output,
} from "@/services/interfaces/auth/IValidateTokenService";

export class ValidateTokenService implements IValidateTokenService {
  constructor(
    private readonly encryptorProvider: IEncryptorProvider,
    private readonly userRepository: IUserRepository
  ) {}

  async run(input: Input): Promise<Output> {
    const { token } = input;

    const { id } = await this.encryptorProvider.decrypt<{ id: string }>(token);

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpError("user not found", 403);
    }

    return { user };
  }
}
