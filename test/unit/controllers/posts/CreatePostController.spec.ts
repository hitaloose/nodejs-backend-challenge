import faker from "faker";

import { CreatePostController } from "@/controllers/implementations/posts/CreatePostController/CreatePostController";
import { HttpRequest } from "@/controllers/interfaces/IController";
import { CreatePostServiceStub } from "@test/mocks/services/posts/CreatePostServiceStub";

const makeSut = () => {
  const mockedCreatePostService = new CreatePostServiceStub();

  const sut = new CreatePostController(mockedCreatePostService);

  return { sut, mockedCreatePostService };
};

const makeRequest = (): HttpRequest => ({
  body: {
    title: faker.random.words(),
    body: faker.random.words(),
    tags: [faker.random.word(), faker.random.word(), faker.random.word()],
  },
});

describe("CreatePostController", () => {
  it("should throw if a invalid body is provided", async () => {
    const { sut } = makeSut();

    const request = makeRequest();
    delete request.body?.title;

    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow();
  });

  it("should call createPostService with correct values", async () => {
    const { sut, mockedCreatePostService } = makeSut();

    const spy = jest.spyOn(mockedCreatePostService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith(request.body);
  });

  it("should return 201 on success", async () => {
    const { sut } = makeSut();

    const { statusCode, body } = await sut.handle(makeRequest());

    expect(statusCode).toBe(201);
    expect(body?.post).toBeTruthy;
  });
});
