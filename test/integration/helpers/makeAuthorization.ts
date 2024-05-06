import { makeEncryptorProvider } from "@/factories/providers/makeEncryptorProvider";
import { InMemoryUserRepository } from "@/repositories/implementations/InMemoryUserRepository";

import { mockUser } from "@test/mocks/models/mockUser";

export const makeAuthorization = async () => {
  const mockedUser = mockUser();
  InMemoryUserRepository.USERS.push(mockedUser);

  const encryptorProvider = makeEncryptorProvider();
  const token = await encryptorProvider.encrypt({ id: mockedUser.id });

  return `bearer ${token}`;
};
