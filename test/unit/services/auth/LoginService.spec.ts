import faker from "faker";

import { Input } from "@/services/interfaces/auth/ILoginService";

import { EncryptorProviderStub } from "@test/mocks/providers/EncryptorProviderStub";
import { HasherProviderStub } from "@test/mocks/providers/HasherProviderStub";
import { UserRepositoryStub } from "@test/mocks/repositories/UserRepositoryStub";
import { mockUser } from "@test/mocks/models/mockUser";
import { LoginService } from "@/services/implementations/auth/LoginService";

const makeSut = () => {
  const mockedUserRepository = new UserRepositoryStub();
  const mockedHasherProvider = new HasherProviderStub();
  const mockedEncryptorProvider = new EncryptorProviderStub();

  jest.spyOn(mockedHasherProvider, "compare").mockResolvedValue(true);

  const sut = new LoginService(
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

const makeInput = (): Input => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("LoginService", () => {
  it("should call findByEmail with correct value", async () => {
    const { sut, mockedUserRepository } = makeSut();

    const spy = jest.spyOn(mockedUserRepository, "findByEmail");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.email);
  });

  it("should throw if user not found", async () => {
    const { sut, mockedUserRepository } = makeSut();

    jest.spyOn(mockedUserRepository, "findByEmail").mockResolvedValueOnce(null);

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("user not found");
  });

  it("should throw if findByEmail throws", async () => {
    const { sut, mockedUserRepository } = makeSut();

    jest
      .spyOn(mockedUserRepository, "findByEmail")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should call compare with correct value", async () => {
    const { sut, mockedHasherProvider, mockedUserRepository } = makeSut();

    const spy = jest.spyOn(mockedHasherProvider, "compare");

    const mockedUser = mockUser();
    jest
      .spyOn(mockedUserRepository, "findByEmail")
      .mockResolvedValueOnce(mockedUser);

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(
      input.password,
      mockedUser.passwordHashed
    );
  });

  it("should throw if compare return false", async () => {
    const { sut, mockedHasherProvider } = makeSut();

    jest.spyOn(mockedHasherProvider, "compare").mockResolvedValueOnce(false);

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("password invalid");
  });

  it("should throw if compare throws", async () => {
    const { sut, mockedHasherProvider } = makeSut();

    jest
      .spyOn(mockedHasherProvider, "compare")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should call encrypt with correct value", async () => {
    const { sut, mockedEncryptorProvider, mockedUserRepository } = makeSut();

    const spy = jest.spyOn(mockedEncryptorProvider, "encrypt");

    const mockedUser = mockUser();
    jest
      .spyOn(mockedUserRepository, "findByEmail")
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
    const { sut, mockedHasherProvider } = makeSut();

    jest.spyOn(mockedHasherProvider, "compare").mockResolvedValueOnce(true);

    const output = await sut.run(makeInput());

    expect(output.token).toBeTruthy();
    expect(output.user).toBeTruthy();
  });
});
