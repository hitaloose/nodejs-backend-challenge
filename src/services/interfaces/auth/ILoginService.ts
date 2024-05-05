import { User } from "@/models/user";

export type Input = {
  email: string;
  password: string;
};

export type Output = {
  token: string;
  user: User;
};

export interface ILoginService {
  run(input: Input): Promise<Output>;
}
