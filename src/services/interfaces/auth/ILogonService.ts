import { User } from "@/models/user";

export type Input = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type Output = {
  token: string;
  user: User;
};

export interface ILogonService {
  run(input: Input): Promise<Output>;
}
