import faker from "faker";
import request from "supertest";

import { InMemoryPostRepository } from "@/repositories/implementations/InMemoryPostRepository";
import { app } from "@/app";
import { mockPost } from "@test/mocks/models/mockPost";
import { makeAuthorization } from "@test/integration/helpers/makeAuthorization";

const makePath = (id?: string) => `/api/posts/${id || faker.datatype.uuid()}`;

describe("DELETE /api/posts/:postId", () => {
  beforeEach(() => {
    InMemoryPostRepository.POSTS = [];
  });

  it("should throw if an invalid id is provided", async () => {
    const response = await request(app)
      .delete(makePath("invalid-id"))
      .set("authorization", await makeAuthorization());

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("postId must be a valid UUID");
  });

  it("should return 404 if post not found", async () => {
    const mockedId = faker.datatype.uuid();

    const response = await request(app)
      .delete(makePath(mockedId))
      .set("authorization", await makeAuthorization());

    expect(response.statusCode).toBe(404);
    expect(response.body.errorMessage).toBe(
      `post with id ${mockedId} not found`
    );
  });

  it("should return 204 on success", async () => {
    const id = faker.datatype.uuid();
    const mockedPost = mockPost({ id });
    InMemoryPostRepository.POSTS.push(mockedPost);

    const response = await request(app)
      .delete(`/api/posts/${id}`)
      .set("authorization", await makeAuthorization());

    expect(response.statusCode).toBe(204);
  });
});
