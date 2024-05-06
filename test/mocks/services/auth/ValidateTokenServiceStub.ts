import {
  IValidateTokenService,
  Output,
} from "@/services/interfaces/auth/IValidateTokenService";
import { mockUser } from "@test/mocks/models/mockUser";

export class ValidateTokenServiceStub implements IValidateTokenService {
  async run(): Promise<Output> {
    return {
      user: mockUser(),
    };
  }
}
