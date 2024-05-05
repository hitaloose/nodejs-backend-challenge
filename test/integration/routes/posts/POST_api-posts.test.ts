import faker from "faker";
import request from "supertest";

import { app } from "@/app";

const makeBody = () => ({
  title: faker.random.words(),
  body: faker.random.words(),
  tags: [faker.random.word(), faker.random.word(), faker.random.word()],
});

describe("POST /api/posts", () => {
  it("should throw if an invalid body is provided", async () => {
    const body = makeBody();
    body.title = "";

    const response = await request(app).post("/api/posts").send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("title is a required field");
  });

  it("should return 201 on success", async () => {
    const response = await request(app).post("/api/posts").send(makeBody());

    expect(response.statusCode).toBe(201);

    expect(response.body.post.id).toBeTruthy();
    expect(response.body.post.title).toBeTruthy();
    expect(response.body.post.body).toBeTruthy();
    expect(response.body.post.tags).toBeTruthy();
  });
});
