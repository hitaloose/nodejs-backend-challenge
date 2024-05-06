import "express-async-errors";

import express from "express";
import request from "supertest";

import { errorHandler } from "@/helpers/errorHandler";
import { HttpError } from "@/errors/HttpError";

const app = express();
app.use(express.json());

app.get("/http_error", () => {
  throw new HttpError("any-http-error-message", 400);
});

app.get("/generic_error", () => {
  throw new Error("any-generic-error-message");
});

app.get("/unknown_error", () => {
  throw "unknow-error";
});

app.use(errorHandler);

describe("errorHandler", () => {
  it("should handle with HttpError", async () => {
    const response = await request(app).get("/http_error");

    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage).toBe("any-http-error-message");
  });

  it("should handle with generic error", async () => {
    const response = await request(app).get("/generic_error");

    expect(response.statusCode).toBe(500);
    expect(response.body.errorMessage).toBe("any-generic-error-message");
  });

  it("should handle with unknown error", async () => {
    const response = await request(app).get("/unknown_error");

    expect(response.statusCode).toBe(500);
    expect(response.body.errorMessage).toBe("unknown error");
  });
});
