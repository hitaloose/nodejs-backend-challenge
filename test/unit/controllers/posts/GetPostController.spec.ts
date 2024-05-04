import faker from "faker";

import { GetPostController } from "@/controllers/implementations/posts/GetPostController/GetPostController";
import { HttpRequest } from "@/controllers/interfaces/IController";
import { GetPostServiceStub } from "@test/mocks/services/posts/GetPostServiceStub";

const makeSut = () => {
  const mockedGetPostService = new GetPostServiceStub();

  const sut = new GetPostController(mockedGetPostService);

  return { sut, mockedGetPostService };
};

const makeRequest = (): HttpRequest => ({
  params: {
    postId: faker.datatype.uuid(),
  },
});

describe("GetPostController", () => {
  it("should call getPostService with correct value", async () => {
    const { sut, mockedGetPostService } = makeSut();

    const spy = jest.spyOn(mockedGetPostService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith(request.params);
  });

  it("should throw if getPostService throws", async () => {
    const { sut, mockedGetPostService } = makeSut();

    jest
      .spyOn(mockedGetPostService, "run")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.handle(makeRequest());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return 200 on success", async () => {
    const { sut } = makeSut();

    const output = await sut.handle(makeRequest());

    expect(output.statusCode).toBe(200);
    expect(output.body?.post).toBeTruthy();
  });
});
