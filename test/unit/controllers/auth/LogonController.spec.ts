import faker from "faker";

import { LogonController } from "@/controllers/implementations/auth/LogonController/LogonController";
import { HttpRequest } from "@/controllers/interfaces/IController";
import { LogonServiceStub } from "@test/mocks/services/auth/LogonServiceStub";

const makeSut = () => {
  const mockedLogonService = new LogonServiceStub();

  const sut = new LogonController(mockedLogonService);

  return { sut, mockedLogonService };
};

const makeRequest = (): HttpRequest => {
  const password = faker.internet.password();

  return {
    body: {
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    },
  };
};

describe("LogonController", () => {
  it("should throw if a invalid body is provided", async () => {
    const { sut } = makeSut();

    const request = makeRequest();
    delete request.body?.email;

    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow("email is a required field");
  });

  it("should call logonService with correct values", async () => {
    const { sut, mockedLogonService } = makeSut();

    const spy = jest.spyOn(mockedLogonService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith(request.body);
  });

  it("should throw if logonService throws", async () => {
    const { sut, mockedLogonService } = makeSut();

    jest
      .spyOn(mockedLogonService, "run")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.handle(makeRequest());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return 201 on success", async () => {
    const { sut } = makeSut();

    const { statusCode, body } = await sut.handle(makeRequest());

    expect(statusCode).toBe(201);
    expect(body?.token).toBeTruthy();
    expect(body?.user).toBeTruthy();
  });
});
