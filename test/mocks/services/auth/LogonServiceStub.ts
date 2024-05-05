import faker from "faker";

import {
  ILogonService,
  Output,
} from "@/services/interfaces/auth/ILogonService";
import { mockUser } from "@test/mocks/models/mockUser";

export class LogonServiceStub implements ILogonService {
  async run(): Promise<Output> {
    return { token: faker.datatype.uuid(), user: mockUser() };
  }
}
