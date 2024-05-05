import jwt from "jsonwebtoken";

import { IEncryptorProvider } from "../interfaces/IEncryptorProvider";

export class JwtEncryptorProvider implements IEncryptorProvider {
  constructor(private readonly secret: string) {}

  async encrypt<T = unknown>(values: T): Promise<string> {
    return jwt.sign(values as any, this.secret, { expiresIn: "7d" });
  }

  async decrypt<T = unknown>(token: string): Promise<T> {
    return jwt.verify(token, this.secret) as any;
  }
}
