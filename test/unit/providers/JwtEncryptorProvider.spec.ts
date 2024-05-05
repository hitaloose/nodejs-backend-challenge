import jwt from "jsonwebtoken";
import faker from "faker";

import { JwtEncryptorProvider } from "@/providers/implementations/JwtEncryptorProvider";

const makeSut = () => {
  const mockedSecret = faker.random.word();

  const sut = new JwtEncryptorProvider(mockedSecret);

  return { sut, mockedSecret };
};

describe("JwtEncryptorProvider", () => {
  describe("encrypt", () => {
    const makeInput = () => ({
      id: faker.datatype.uuid(),
    });

    it("should call jwt.sign with correct values", async () => {
      const { sut, mockedSecret } = makeSut();

      const spy = jest.spyOn(jwt, "sign");

      const input = makeInput();
      await sut.encrypt(input);

      expect(spy).toHaveBeenLastCalledWith(input, mockedSecret, {
        expiresIn: "7d",
      });
    });

    it("should throw if jwt.sign throws", async () => {
      const { sut } = makeSut();

      jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
        throw new Error("any-error-message");
      });

      const promise = sut.encrypt(makeInput());

      await expect(promise).rejects.toThrow("any-error-message");
    });

    it("should return encrypted token on success", async () => {
      const { sut } = makeSut();

      const token = await sut.encrypt(makeInput());

      expect(token).toBeTruthy();
    });
  });

  describe("decrypt", () => {
    it("should call jwt.verify with correct values", async () => {
      const { sut, mockedSecret } = makeSut();

      const spy = jest.spyOn(jwt, "verify");

      const mockedPayload = {
        id: faker.datatype.uuid(),
      };
      const token = jwt.sign(mockedPayload, mockedSecret);

      await sut.decrypt(token);

      expect(spy).toHaveBeenLastCalledWith(token, mockedSecret);
    });

    it("should throw if jwt.verify throws", async () => {
      const { sut, mockedSecret } = makeSut();

      jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
        throw new Error("any-error-message");
      });

      const mockedPayload = {
        id: faker.datatype.uuid(),
      };
      const token = jwt.sign(mockedPayload, mockedSecret);

      const promise = sut.decrypt(token);

      await expect(promise).rejects.toThrow("any-error-message");
    });

    it("should throw if an invalid token is provided", async () => {
      const { sut } = makeSut();

      const mockedPayload = {
        id: faker.datatype.uuid(),
      };
      const token = jwt.sign(mockedPayload, "any-other-secret");

      const promise = sut.decrypt(token);

      await expect(promise).rejects.toThrow("invalid signature");
    });

    it("should return decrypted payload on success", async () => {
      const { sut, mockedSecret } = makeSut();

      const mockedPayload = {
        id: faker.datatype.uuid(),
      };
      const token = jwt.sign(mockedPayload, mockedSecret);

      const decryptedPayload = await sut.decrypt<typeof mockedPayload>(token);

      await expect(decryptedPayload.id).toBe(mockedPayload.id);
    });
  });
});
