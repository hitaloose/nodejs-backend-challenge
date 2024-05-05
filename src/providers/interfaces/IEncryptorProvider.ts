export interface IEncryptorProvider {
  encrypt<T = unknown>(values: T): Promise<string>;
  decrypt<T = unknown>(token: string): Promise<T>;
}
