import { IEncryptorProvider } from "@/providers/interfaces/IEncryptorProvider";

export class EncryptorProviderStub implements IEncryptorProvider {
  async encrypt<T = unknown>(values: T): Promise<string> {
    return `${JSON.stringify(values)}---encrypted`;
  }

  async decrypt<T = unknown>(token: string): Promise<T> {
    return JSON.parse(token.split("---")[0]);
  }
}
