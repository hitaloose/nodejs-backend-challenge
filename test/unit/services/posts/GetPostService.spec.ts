import faker from "faker";

import { GetPostService } from "@/services/implementations/posts/GetPostService";
import { Input } from "@/services/interfaces/posts/IGetPostService";
import { PostRepositoryStub } from "@test/mocks/repositories/PostRepositoryStub";

const makeSut = () => {
  const mockedPostRepository = new PostRepositoryStub();

  const sut = new GetPostService(mockedPostRepository);

  return { sut, mockedPostRepository };
};

const makeInput = (): Input => ({
  postId: faker.datatype.uuid(),
});

describe("GetPostService", () => {
  it("should call findById with correct value", async () => {
    const { sut, mockedPostRepository } = makeSut();

    const spy = jest.spyOn(mockedPostRepository, "findById");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.postId);
  });

  it("should throw if findById return null", async () => {
    const { sut, mockedPostRepository } = makeSut();

    jest.spyOn(mockedPostRepository, "findById").mockResolvedValueOnce(null);

    const input = makeInput();
    const promise = sut.run(input);

    await expect(promise).rejects.toThrow(
      `post with id ${input.postId} not found`
    );
  });

  it("should throw if findById throws", async () => {
    const { sut, mockedPostRepository } = makeSut();

    jest
      .spyOn(mockedPostRepository, "findById")
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
