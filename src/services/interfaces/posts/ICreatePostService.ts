import { Post } from "@/models/post";

export type Input = {
  title: string;
  body: string;
  tags: string[];
};

export type Output = {
  post: Post;
};

export interface ICreatePostService {
  run(input: Input): Promise<Output>;
}
