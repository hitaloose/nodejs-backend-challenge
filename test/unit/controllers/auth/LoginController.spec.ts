import faker from "faker";

import { HttpRequest } from "@/controllers/interfaces/IController";
import { LoginServiceStub } from "@test/mocks/services/auth/LoginServiceStub";
import { LoginController } from "@/controllers/implementations/auth/LoginController/LoginController";

const makeSut = () => {
  const mockedLoginService = new LoginServiceStub();

  const sut = new LoginController(mockedLoginService);

  return { sut, mockedLoginService };
};

const makeRequest = (): HttpRequest => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
});

describe("LoginController", () => {
  it("should throw if a invalid body is provided", async () => {
    const { sut } = makeSut();

    const request = makeRequest();
    delete request.body?.email;

    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow("email is a required field");
  });

  it("should call loginService with correct values", async () => {
    const { sut, mockedLoginService } = makeSut();

    const spy = jest.spyOn(mockedLoginService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith(request.body);
  });

  it("should throw if logonService throws", async () => {
    const { sut, mockedLoginService } = makeSut();

    jest
      .spyOn(mockedLoginService, "run")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.handle(makeRequest());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return 200 on success", async () => {
    const { sut } = makeSut();

    const { statusCode, body } = await sut.handle(makeRequest());

    expect(statusCode).toBe(200);
    expect(body?.token).toBeTruthy();
    expect(body?.user).toBeTruthy();
  });
});
