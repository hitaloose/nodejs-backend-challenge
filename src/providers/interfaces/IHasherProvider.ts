export interface IHashserProvider {
  hash(plaintext: string): Promise<string>;
  compare(plaintext: string, hashedtext: string): Promise<boolean>;
}
