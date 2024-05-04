import faker from "faker";

import { DeletePostController } from "@/controllers/implementations/posts/DeletePostController/DeletePostController";
import { HttpRequest } from "@/controllers/interfaces/IController";
import { DeletePostServiceStub } from "@test/mocks/services/posts/DeletePostServiceStub";

const makeSut = () => {
  const mockedDeletePostService = new DeletePostServiceStub();

  const sut = new DeletePostController(mockedDeletePostService);

  return { sut, mockedDeletePostService };
};

const makeRequest = (): HttpRequest => ({
  params: {
    postId: faker.datatype.uuid(),
  },
});

describe("DeletePostController", () => {
  it("should call deletePostService with correct value", async () => {
    const { sut, mockedDeletePostService } = makeSut();

    const spy = jest.spyOn(mockedDeletePostService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith(request.params);
  });

  it("should throw if deletePostService throws", async () => {
    const { sut, mockedDeletePostService } = makeSut();

    jest
      .spyOn(mockedDeletePostService, "run")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.handle(makeRequest());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return 204 on success", async () => {
    const { sut } = makeSut();

    const output = await sut.handle(makeRequest());

    expect(output.statusCode).toBe(204);
  });
});
