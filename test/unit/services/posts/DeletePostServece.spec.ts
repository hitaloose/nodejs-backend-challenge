import faker from "faker";

import { DeletePostService } from "@/services/implementations/posts/DeletePostService";
import { Input } from "@/services/interfaces/posts/IDeletePostService";
import { PostRepositoryStub } from "@test/mocks/repositories/PostRepositoryStub";

const makeSut = () => {
  const mockedPostRepository = new PostRepositoryStub();

  const sut = new DeletePostService(mockedPostRepository);

  return { sut, mockedPostRepository };
};

const makeInput = (): Input => ({
  postId: faker.datatype.uuid(),
});

describe("DeletePostController", () => {
  it("should call delete with correct value", async () => {
    const { sut, mockedPostRepository } = makeSut();

    const spy = jest.spyOn(mockedPostRepository, "delete");

    const input = makeInput();
    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.postId);
  });

  it("should throw if delete throws", async () => {
    const { sut, mockedPostRepository } = makeSut();

    jest
      .spyOn(mockedPostRepository, "delete")
      .mockRejectedValueOnce(new Error("any-error-message"));

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow("any-error-message");
  });

  it("should not throw on success", async () => {
    const { sut } = makeSut();

    const promise = sut.run(makeInput());

    await expect(promise).resolves.not.toThrow();
  });
});
