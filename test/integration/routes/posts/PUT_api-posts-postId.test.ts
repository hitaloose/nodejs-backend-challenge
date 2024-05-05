import faker from "faker";
import request from "supertest";

import { app } from "@/app";
import { InMemoryPostRepository } from "@/repositories/implementations/InMemoryPostRepository";
import { mockPost } from "@test/mocks/models/mockPost";

const makeBody = () => ({
  title: faker.random.words(),
  body: faker.random.words(),
  tags: [faker.random.word(), faker.random.word(), faker.random.word()],
});

const makePath = (id?: string) => `/api/posts/${id || faker.datatype.uuid()}`;

describe("PUT /api/posts/:postId", () => {
  beforeEach(() => {
    InMemoryPostRepository.POSTS = [];
  });

  it("should throw if an invalid body is provided", async () => {
    const body = makeBody();
    body.title = "";

    const response = await request(app).put(makePath()).send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("title is a required field");
  });

  it("should throw if an invalid id is provided", async () => {
    const response = await request(app)
      .put(makePath("invalid-id"))
      .send(makeBody());

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("postId must be a valid UUID");
  });

  it("should return 404 if post not found", async () => {
    const mockedPostId = faker.datatype.uuid();

    const response = await request(app)
      .put(makePath(mockedPostId))
      .send(makeBody());

    expect(response.statusCode).toBe(404);
    expect(response.body.errorMessage).toBe(
      `post with id ${mockedPostId} not found`
    );
  });

  it("should return 200 on success", async () => {
    const id = faker.datatype.uuid();
    const mockedPost = mockPost({ id });
    InMemoryPostRepository.POSTS.push(mockedPost);

    const body = makeBody();
    const response = await request(app).put(makePath(id)).send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body?.post).toBeTruthy();
    expect(response.body?.post.title).toBe(body.title);
    expect(response.body?.post.body).toBe(body.body);
    expect(response.body?.post.tags).toStrictEqual(body.tags);
  });
});
