import faker from "faker";
import request from "supertest";

import { app } from "@/app";
import { mockUser } from "@test/mocks/models/mockUser";
import { InMemoryUserRepository } from "@/repositories/implementations/InMemoryUserRepository";

const makeBody = () => {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

describe("POST /api/logon", () => {
  beforeEach(() => {
    InMemoryUserRepository.USERS = [];
  });

  it("should return 400 if an invalid body is provided", async () => {
    const body = makeBody();
    body.email = "";

    const response = await request(app).post("/api/logon").send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("email is a required field");
  });

  it("should return 422 if an invalid passwords is provided", async () => {
    const body = makeBody();
    body.passwordConfirmation = "wrong_password";

    const response = await request(app).post("/api/logon").send(body);

    expect(response.statusCode).toBe(422);
    expect(response.body.errorMessage).toBe("passwords not match");
  });

  it("should return 422 if an existing email is provided", async () => {
    const mockedUser = mockUser();

    InMemoryUserRepository.USERS.push(mockedUser);

    const body = makeBody();
    body.email = mockedUser.email;

    const response = await request(app).post("/api/logon").send(body);

    expect(response.statusCode).toBe(422);
    expect(response.body.errorMessage).toBe("user already exist");
  });

  it("should return 201 on success", async () => {
    const response = await request(app).post("/api/logon").send(makeBody());

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user).toBeTruthy();
  });
});
