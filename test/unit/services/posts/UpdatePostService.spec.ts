import faker from "faker";

import { UpdatePostService } from "@/services/implementations/posts/UpdatePostService";
import { Input } from "@/services/interfaces/posts/IUpdatePostService";
import { PostRepositoryStub } from "@test/mocks/repositories/PostRepositoryStub";

const makeSut = () => {
  const mockedPostRepository = new PostRepositoryStub();

  const sut = new UpdatePostService(mockedPostRepository);

  return { sut, mockedPostRepository };
};

const makeInput = (): Input => ({
  postId: faker.datatype.uuid(),
  data: {
    title: faker.random.words(),
    body: faker.random.words(),
    tags: [faker.random.word(), faker.random.word(), faker.random.word()],
  },
});

describe("UpdatePostService", () => {
  it("should call update with correct values", async () => {
    const { sut, mockedPostRepository } = makeSut();

    const spy = jest.spyOn(mockedPostRepository, "update");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.postId, input.data);
  });

  it("should throw if update throws", async () => {
    const { sut, mockedPostRepository } = makeSut();

    jest
      .spyOn(mockedPostRepository, "update")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should return a post on success", async () => {
    const { sut } = makeSut();

    const output = await sut.run(makeInput());

    expect(output.post).toBeTruthy();
  });
});
