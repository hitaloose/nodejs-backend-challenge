import request from "supertest";

import { app } from "@/app";
import { InMemoryPostRepository } from "@/repositories/implementations/InMemoryPostRepository";
import { mockPost } from "@test/mocks/models/mockPost";

const makeQueries = () => ({
  page: 1,
});

describe("GET /api/posts", () => {
  beforeEach(() => {
    InMemoryPostRepository.POSTS = [];
  });

  it("should throw if an invalid queries is provided", async () => {
    const queries = makeQueries();
    queries.page = 0;

    const response = await request(app).get("/api/posts").query(queries);

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe(
      "page must be greater than or equal to 1"
    );
  });

  it("should return 200 on success when no itens on DB", async () => {
    const response = await request(app).get("/api/posts").query(makeQueries());

    expect(response.statusCode).toBe(200);

    expect(response.body.posts).toBeTruthy();
    expect(response.body.posts.length).toBe(0);
    expect(response.body.maxPage).toBe(0);
  });

  it("should return 200 on success", async () => {
    InMemoryPostRepository.POSTS.push(mockPost());
    InMemoryPostRepository.POSTS.push(mockPost());
    InMemoryPostRepository.POSTS.push(mockPost());
    InMemoryPostRepository.POSTS.push(mockPost());

    const response = await request(app).get("/api/posts").query(makeQueries());

    expect(response.statusCode).toBe(200);

    expect(response.body.posts).toBeTruthy();
    expect(response.body.posts.length).toBe(4);
    expect(response.body.maxPage).toBe(1);
  });

  it("should return 200 on success", async () => {
    for (const _ of new Array(65)) {
      InMemoryPostRepository.POSTS.push(mockPost());
    }

    const response = await request(app).get("/api/posts").query(makeQueries());

    expect(response.statusCode).toBe(200);

    expect(response.body.posts).toBeTruthy();
    expect(response.body.posts.length).toBe(30); // max page size
    expect(response.body.maxPage).toBe(3);
  });
});
