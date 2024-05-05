import faker from "faker";
import bcrypt from "bcrypt";

import { BcryptHasherProvider } from "@/providers/implementations/BcryptHasherProvider";

const makeSut = () => {
  const mockedSalt = 1;

  const sut = new BcryptHasherProvider(mockedSalt);

  return { sut, mockedSalt };
};

describe("BcryptHasherProvider", () => {
  describe("hash", () => {
    it("should call bcrypt.hash with correct values", async () => {
      const { sut, mockedSalt } = makeSut();

      const spy = jest.spyOn(bcrypt, "hash");

      const plaintext = faker.random.word();

      await sut.hash(plaintext);

      expect(spy).toHaveBeenLastCalledWith(plaintext, mockedSalt);
    });

    it("should throw if bcrypt.hash throws", async () => {
      const { sut } = makeSut();

      jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
        throw new Error("any-error-message");
      });

      const promise = sut.hash(faker.random.word());

      await expect(promise).rejects.toThrow("any-error-message");
    });

    it("should return a hahsed value on success", async () => {
      const { sut } = makeSut();

      const plaintext = faker.random.word();
      const hashedValue = sut.hash(plaintext);

      expect(hashedValue).toBeTruthy();
      expect(hashedValue).not.toBe(plaintext);
    });
  });

  describe("compare", () => {
    it("should call bcrypt.compare with correct values", async () => {
      const { sut, mockedSalt } = makeSut();

      const spy = jest.spyOn(bcrypt, "compare");

      const plaintext = faker.random.word();
      const hashedValue = await bcrypt.hash(plaintext, mockedSalt);

      await sut.compare(plaintext, hashedValue);

      expect(spy).toHaveBeenLastCalledWith(plaintext, hashedValue);
    });

    it("should throw if bcrypt.compare throws", async () => {
      const { sut, mockedSalt } = makeSut();

      jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
        throw new Error("any-error-message");
      });

      const plaintext = faker.random.word();
      const hashedValue = await bcrypt.hash(plaintext, mockedSalt);

      const promise = sut.compare(plaintext, hashedValue);

      await expect(promise).rejects.toThrow("any-error-message");
    });

    it("should return false on fails", async () => {
      const { sut } = makeSut();

      const plaintext = faker.random.word();

      const comparation = await sut.compare(plaintext, plaintext);

      expect(comparation).toBe(false);
    });

    it("should return true on success", async () => {
      const { sut, mockedSalt } = makeSut();

      const plaintext = faker.random.word();
      const hashedValue = await bcrypt.hash(plaintext, mockedSalt);

      const comparation = await sut.compare(plaintext, hashedValue);

      expect(comparation).toBe(true);
    });
  });
});
