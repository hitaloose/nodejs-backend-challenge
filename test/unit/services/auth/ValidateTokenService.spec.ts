import faker from "faker";

import { ValidateTokenService } from "@/services/implementations/auth/ValidateTokenService";
import { Input } from "@/services/interfaces/auth/IValidateTokenService";

import { EncryptorProviderStub } from "@test/mocks/providers/EncryptorProviderStub";
import { UserRepositoryStub } from "@test/mocks/repositories/UserRepositoryStub";

const makeSut = () => {
  const mockedEncryptorProvider = new EncryptorProviderStub();
  const mockedUserRepository = new UserRepositoryStub();

  const sut = new ValidateTokenService(
    mockedEncryptorProvider,
    mockedUserRepository
  );

  return { sut, mockedEncryptorProvider, mockedUserRepository };
};

const makeInput = (id?: string): Input => ({
  token: `${JSON.stringify({ id: id || faker.datatype.uuid() })}---encrypted`,
});

describe("ValidateTokenService", () => {
  it("should call decrypt with correct value", async () => {
    const { sut, mockedEncryptorProvider } = makeSut();

    const spy = jest.spyOn(mockedEncryptorProvider, "decrypt");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.token);
  });

  it("should throw if decrypt throws", async () => {
    const { sut, mockedEncryptorProvider } = makeSut();

    jest
      .spyOn(mockedEncryptorProvider, "decrypt")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should call findById with correct values", async () => {
    const { sut, mockedUserRepository } = makeSut();

    const spy = jest.spyOn(mockedUserRepository, "findById");

    const mockedId = faker.datatype.uuid();
    const input = makeInput(mockedId);
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(mockedId);
  });

  it("should throw user not found if findById return null", async () => {
    const { sut, mockedUserRepository } = makeSut();

    jest.spyOn(mockedUserRepository, "findById").mockResolvedValueOnce(null);

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("user not found");
  });

  it("should throw if findById throws", async () => {
    const { sut, mockedUserRepository } = makeSut();

    jest
      .spyOn(mockedUserRepository, "findById")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return an user on success", async () => {
    const { sut } = makeSut();

    const output = await sut.run(makeInput());

    expect(output.user).toBeTruthy();
  });
});
