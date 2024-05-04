import { Post } from "@/models/post";

export type Input = {
  postId: string;
};

export type Output = {
  post: Post;
};

export interface IGetPostService {
  run(input: Input): Promise<Output>;
}
