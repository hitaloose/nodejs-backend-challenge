import { GetPostsController } from "@/controllers/implementations/posts/GetPostsController/GetPostsController";
import { HttpRequest } from "@/controllers/interfaces/IController";
import { GetPostsServiceStub } from "@test/mocks/services/posts/GetPostsServiceStub";

const makeSut = () => {
  const mockedGetPostsService = new GetPostsServiceStub();

  const sut = new GetPostsController(mockedGetPostsService);

  return { sut, mockedGetPostsService };
};

const makeRequest = (): HttpRequest => ({
  queries: {
    page: 1,
  },
});

describe("GetPostsController", () => {
  it("should throw if page is not provided", async () => {
    const { sut } = makeSut();

    const request = makeRequest();
    delete request.queries?.page;

    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow("page is a required field");
  });

  it("should call getPostsService with correct values", async () => {
    const { sut, mockedGetPostsService } = makeSut();

    const spy = jest.spyOn(mockedGetPostsService, "run");

    const request = makeRequest();
    await sut.handle(request);

    expect(spy).toHaveBeenLastCalledWith(request.queries);
  });

  it("should return 200 on success", async () => {
    const { sut } = makeSut();

    const { statusCode, body } = await sut.handle(makeRequest());

    expect(statusCode).toBe(200);
    expect(body?.posts).toBeTruthy();
    expect(body?.maxPage).toBeTruthy();
  });
});
