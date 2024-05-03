import { Input } from "@/services/interfaces/posts/ICreatePostService";
import { CreatePostService } from "@/services/implementations/posts/CreatePostService";
import { PostRepositoryStub } from "@test/mocks/repositories/PostRepositoryStub";

const makeSut = () => {
  const mockedPostRepository = new PostRepositoryStub();

  const sut = new CreatePostService(mockedPostRepository);

  return { sut, mockedPostRepository };
};

const makeInput = (): Input => ({
  body: "any body",
  title: "any title",
  tags: [],
});

describe("CreatePostService", () => {
  it("should call insert with correct values", async () => {
    const { sut, mockedPostRepository } = makeSut();

    const spy = jest.spyOn(mockedPostRepository, "insert");

    const input = makeInput();

    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input);
  });

  it("should throw if insert throws", async () => {
    const { sut, mockedPostRepository } = makeSut();

    jest
      .spyOn(mockedPostRepository, "insert")
      .mockRejectedValueOnce(new Error());

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow();
  });

  it("should return a post on success", async () => {
    const { sut } = makeSut();

    const output = await sut.run(makeInput());

    expect(output.post).toBeTruthy();
  });
});
