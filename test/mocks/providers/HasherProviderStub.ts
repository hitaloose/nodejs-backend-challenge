import { IHashserProvider } from "@/providers/interfaces/IHasherProvider";

export class HasherProviderStub implements IHashserProvider {
  async hash(plaintext: string): Promise<string> {
    return `${plaintext}-hashed`;
  }

  async compare(plaintext: string, hashedtext: string): Promise<boolean> {
    return hashedtext === `${plaintext}-hashed`;
  }
}
