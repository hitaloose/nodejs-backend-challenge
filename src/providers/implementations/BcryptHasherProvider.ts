import bcrypt from "bcrypt";

import { IHashserProvider } from "../interfaces/IHasherProvider";

export class BcryptHasherProvider implements IHashserProvider {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, hashedtext: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hashedtext);
  }
}
