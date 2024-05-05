import faker from "faker";
import request from "supertest";

import { app } from "@/app";
import { InMemoryUserRepository } from "@/repositories/implementations/InMemoryUserRepository";

const makeBody = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("POST /api/login", () => {
  beforeEach(() => {
    InMemoryUserRepository.USERS = [];
  });

  it("should return 400 if an invalid body is provided", async () => {
    const body = makeBody();
    body.email = "";

    const response = await request(app).post("/api/login").send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("email is a required field");
  });

  it("should return 422 if user not found", async () => {
    const response = await request(app).post("/api/login").send(makeBody());

    expect(response.statusCode).toBe(422);
    expect(response.body.errorMessage).toBe("user not found");
  });

  it("should return 422 if invalid password is provided", async () => {
    const mockedEmail = faker.internet.email();
    const mockedPassword = faker.internet.password();

    await request(app).post("/api/logon").send({
      email: mockedEmail,
      password: mockedPassword,
      passwordConfirmation: mockedPassword,
    });

    const body = makeBody();
    body.email = mockedEmail;
    body.password = "wrong-password";

    const response = await request(app).post("/api/login").send(body);

    expect(response.statusCode).toBe(422);
    expect(response.body.errorMessage).toBe("password invalid");
  });

  it("should return 200 on success", async () => {
    const mockedEmail = faker.internet.email();
    const mockedPassword = faker.internet.password();

    await request(app).post("/api/logon").send({
      email: mockedEmail,
      password: mockedPassword,
      passwordConfirmation: mockedPassword,
    });

    const body = makeBody();
    body.email = mockedEmail;
    body.password = mockedPassword;

    const response = await request(app).post("/api/login").send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user).toBeTruthy();
  });
});
