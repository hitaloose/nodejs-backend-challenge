import faker from "faker";

import { LogonService } from "@/services/implementations/auth/LogonService";
import { Input } from "@/services/interfaces/auth/ILogonService";

import { EncryptorProviderStub } from "@test/mocks/providers/EncryptorProviderStub";
import { HasherProviderStub } from "@test/mocks/providers/HasherProviderStub";
import { UserRepositoryStub } from "@test/mocks/repositories/UserRepositoryStub";
import { mockUser } from "@test/mocks/models/mockUser";

const makeSut = () => {
  const mockedUserRepository = new UserRepositoryStub();
  const mockedHasherProvider = new HasherProviderStub();
  const mockedEncryptorProvider = new EncryptorProviderStub();

  jest.spyOn(mockedUserRepository, "findByEmail").mockResolvedValue(null);

  const sut = new LogonService(
    mockedUserRepository,
    mockedHasherProvider,
    mockedEncryptorProvider
  );

  return {
    sut,
    mockedUserRepository,
    mockedHasherProvider,
    mockedEncryptorProvider,
  };
};

const makeInput = (): Input => {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

describe("LogonService", () => {
  it("should throw if passwords not  matchs", async () => {
    const { sut } = makeSut();

    const input = makeInput();
    input.passwordConfirmation = "incorrect-password";

    const promise = sut.run(input);

    await expect(promise).rejects.toThrow("passwords not match");
  });

  it("should call findByEmail with correct value", async () => {
    const { sut, mockedUserRepository } = makeSut();

    const spy = jest.spyOn(mockedUserRepository, "findByEmail");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.email);
  });

  it("should throw user already exist if findByEmail return an user", async () => {
    const { sut, mockedUserRepository } = makeSut();

    jest
      .spyOn(mockedUserRepository, "findByEmail")
      .mockResolvedValueOnce(mockUser());

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("user already exist");
  });

  it("should throw if findByEmail throws", async () => {
    const { sut, mockedUserRepository } = makeSut();

    jest
      .spyOn(mockedUserRepository, "findByEmail")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should call hash with correct value", async () => {
    const { sut, mockedHasherProvider } = makeSut();

    const spy = jest.spyOn(mockedHasherProvider, "hash");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.password);
  });

  it("should throw if hash throws", async () => {
    const { sut, mockedHasherProvider } = makeSut();

    jest
      .spyOn(mockedHasherProvider, "hash")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should call insert with correct value", async () => {
    const { sut, mockedUserRepository } = makeSut();

    const spy = jest.spyOn(mockedUserRepository, "insert");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith({
      email: input.email,
      passwordHashed: `${input.password}-hashed`,
    });
  });

  it("should throw if insert throws", async () => {
    const { sut, mockedUserRepository } = makeSut();

    jest
      .spyOn(mockedUserRepository, "insert")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should call encrypt with correct value", async () => {
    const { sut, mockedEncryptorProvider, mockedUserRepository } = makeSut();

    const spy = jest.spyOn(mockedEncryptorProvider, "encrypt");

    const mockedUser = mockUser();
    jest
      .spyOn(mockedUserRepository, "insert")
      .mockResolvedValueOnce(mockedUser);

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith({
      id: mockedUser.id,
    });
  });

  it("should throw if encrypt throws", async () => {
    const { sut, mockedEncryptorProvider } = makeSut();

    jest
      .spyOn(mockedEncryptorProvider, "encrypt")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return token and user on success", async () => {
    const { sut } = makeSut();

    const output = await sut.run(makeInput());

    expect(output.token).toBeTruthy();
    expect(output.user).toBeTruthy();
  });
});
