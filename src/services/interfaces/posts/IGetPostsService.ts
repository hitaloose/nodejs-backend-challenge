import { Post } from "@/models/post";

export type Input = {
  page: number;
};

export type Output = {
  posts: Post[];
  maxPage: number;
};

export interface IGetPostsService {
  run(input: Input): Promise<Output>;
}
