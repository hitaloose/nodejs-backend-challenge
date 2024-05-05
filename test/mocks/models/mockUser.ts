import faker from "faker";

import { User } from "@/models/user";

export const mockUser = (override?: Partial<User>): User => {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    passwordHashed: faker.datatype.uuid(),
    ...override,
  };
};
