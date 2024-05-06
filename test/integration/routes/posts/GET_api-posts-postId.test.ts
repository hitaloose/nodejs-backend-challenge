import faker from "faker";
import request from "supertest";

import { InMemoryPostRepository } from "@/repositories/implementations/InMemoryPostRepository";
import { app } from "@/app";
import { mockPost } from "@test/mocks/models/mockPost";
import { makeAuthorization } from "@test/integration/helpers/makeAuthorization";

describe("GET /api/posts/:postId", () => {
  beforeEach(() => {
    InMemoryPostRepository.POSTS = [];
  });

  it("should throw if an invalid id is provided", async () => {
    const response = await request(app)
      .get("/api/posts/invalid_uuid")
      .set("authorization", await makeAuthorization());

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("postId must be a valid UUID");
  });

  it("should return 404 if post not found", async () => {
    const findedId = faker.datatype.uuid();

    const response = await request(app)
      .get(`/api/posts/${findedId}`)
      .set("authorization", await makeAuthorization());

    expect(response.statusCode).toBe(404);
    expect(response.body.errorMessage).toBe(
      `post with id ${findedId} not found`
    );
  });

  it("should return 200 on success", async () => {
    const id = faker.datatype.uuid();
    const mockedPost = mockPost({ id });
    InMemoryPostRepository.POSTS.push(mockedPost);

    const response = await request(app)
      .get(`/api/posts/${id}`)
      .set("authorization", await makeAuthorization());

    expect(response.statusCode).toBe(200);
    expect(response.body?.post).toBeTruthy();
  });
});
