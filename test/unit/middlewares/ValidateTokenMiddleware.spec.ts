import faker from "faker";

import { ValidateTokenMiddleware } from "@/middlewares/implementations/ValidateTokenMiddleware";
import { HttpRequest } from "@/middlewares/interfaces/IMiddleware";

import { ValidateTokenServiceStub } from "@test/mocks/services/auth/ValidateTokenServiceStub";

const makeSut = () => {
  const mockedValidateTokenService = new ValidateTokenServiceStub();

  const sut = new ValidateTokenMiddleware(mockedValidateTokenService);

  return { sut, mockedValidateTokenService };
};

const makeRequest = (): HttpRequest => ({
  headers: {
    authorization: `bearer ${faker.datatype.uuid()}`,
  },
});

describe("ValidateTokenMiddleware", () => {
  it("should throw if token is not provided", async () => {
    const { sut } = makeSut();

    const promise = sut.handle({});

    await expect(promise).rejects.toThrow("token is not provided");
  });

  it("should throw if token sufix is invalid", async () => {
    const { sut } = makeSut();

    const request = makeRequest();
    request.headers!.authorization = `invalid-sufix ${faker.datatype.uuid()}`;
    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow("invalid token");
  });

  it("should call validateTokenService with correct value", async () => {
    const { sut, mockedValidateTokenService } = makeSut();

    const spy = jest.spyOn(mockedValidateTokenService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith({
      token: String(request.headers!.authorization).split(" ")[1],
    });
  });

  it("should return an user on success", async () => {
    const { sut } = makeSut();

    const output = await sut.handle(makeRequest());

    expect(output.success).toBe(true);
    expect(output.body?.user).toBeTruthy();
  });
});
