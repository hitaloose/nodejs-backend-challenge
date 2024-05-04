import faker from "faker";

import { UpdatePostController } from "@/controllers/implementations/posts/UpdatePostController/UpdatePostController";
import { HttpRequest } from "@/controllers/interfaces/IController";
import { UpdatePostServiceStub } from "@test/mocks/services/posts/UpdatePostServiceStub";

const makeSut = () => {
  const mockedUpdatePostService = new UpdatePostServiceStub();

  const sut = new UpdatePostController(mockedUpdatePostService);

  return { sut, mockedUpdatePostService };
};

const makeRequest = (): HttpRequest => ({
  params: {
    postId: faker.datatype.uuid(),
  },
  body: {
    title: faker.random.words(),
    body: faker.random.words(),
    tags: [faker.random.word(), faker.random.word(), faker.random.word()],
  },
});

describe("UpdatePostController", () => {
  it("should call updatePostService with correct values", async () => {
    const { sut, mockedUpdatePostService } = makeSut();

    const spy = jest.spyOn(mockedUpdatePostService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith({
      postId: request.params?.postId,
      data: request.body,
    });
  });

  it("should throw if updatePostService throws", async () => {
    const { sut, mockedUpdatePostService } = makeSut();

    jest
      .spyOn(mockedUpdatePostService, "run")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.handle(makeRequest());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return 200 on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(makeRequest());

    expect(response.statusCode).toBe(200);
    expect(response.body?.post).toBeTruthy();
  });
});
