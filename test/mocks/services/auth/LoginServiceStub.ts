import faker from "faker";

import {
  ILoginService,
  Output,
} from "@/services/interfaces/auth/ILoginService";
import { mockUser } from "@test/mocks/models/mockUser";

export class LoginServiceStub implements ILoginService {
  async run(): Promise<Output> {
    return { token: faker.datatype.uuid(), user: mockUser() };
  }
}
