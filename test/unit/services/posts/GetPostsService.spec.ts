import { GetPostsService } from "@/services/implementations/posts/GetPostsService";
import { Input } from "@/services/interfaces/posts/IGetPostsService";
import { PostRepositoryStub } from "@test/mocks/repositories/PostRepositoryStub";

const makeSut = () => {
  const mockedPostRepository = new PostRepositoryStub();

  const sut = new GetPostsService(mockedPostRepository);

  return { sut, mockedPostRepository };
};

const makeInput = (): Input => ({
  page: 1,
});

describe("GetPostsService", () => {
  it("should call findByPageAndCountAll with correct values", async () => {
    const { sut, mockedPostRepository } = makeSut();

    const spy = jest.spyOn(mockedPostRepository, "findByPageAndCountAll");

    const input = makeInput();

    await sut.run(input);

    expect(spy).toHaveBeenLastCalledWith(input.page);
  });

  it("should throw if findByPageAndCountAll throws", async () => {
    const { sut, mockedPostRepository } = makeSut();

    jest
      .spyOn(mockedPostRepository, "findByPageAndCountAll")
      .mockRejectedValueOnce(new Error());

    const promise = sut.run(makeInput());

    await expect(promise).rejects.toThrow();
  });

  it("should return posts on success", async () => {
    const { sut } = makeSut();

    const { posts, maxPage } = await sut.run(makeInput());

    expect(posts).toBeTruthy();
    expect(maxPage).toBeTruthy();
  });
});
