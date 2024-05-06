import faker from "faker";
import request from "supertest";

import { InMemoryPostRepository } from "@/repositories/implementations/InMemoryPostRepository";
import { app } from "@/app";
import { makeAuthorization } from "@test/integration/helpers/makeAuthorization";
import { InMemoryUserRepository } from "@/repositories/implementations/InMemoryUserRepository";

const makePath = () => `/api/posts?page=1`;

describe("ValidateTokenMiddleware", () => {
  beforeEach(() => {
    InMemoryPostRepository.POSTS = [];
    InMemoryUserRepository.USERS = [];
  });

  it("should throw if user not found", async () => {
    const authorizationToken = await makeAuthorization();

    InMemoryUserRepository.USERS = [];

    const response = await request(app)
      .get(makePath())
      .set("authorization", authorizationToken);

    expect(response.statusCode).toBe(403);
    expect(response.body.errorMessage).toBe("user not found");
  });

  it("should throw if token sufix invalid", async () => {
    const authorizationToken = await makeAuthorization();
    const [, token] = authorizationToken.split(" ");

    const response = await request(app)
      .get(makePath())
      .set("authorization", `invalid-sufix ${token}`);

    expect(response.statusCode).toBe(403);
    expect(response.body.errorMessage).toBe("invalid token");
  });

  it("should pass to middleware on success", async () => {
    const response = await request(app)
      .get(makePath())
      .set("authorization", await makeAuthorization());

    expect(response.statusCode).toBe(200);
  });
});
