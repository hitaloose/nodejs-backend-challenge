import { User } from "@/models/user";

export type Input = {
  token: string;
};

export type Output = {
  user: User;
};

export interface IValidateTokenService {
  run(input: Input): Promise<Output>;
}
