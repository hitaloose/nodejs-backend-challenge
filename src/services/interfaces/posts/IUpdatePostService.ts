import { Post } from "@/models/post";

export type Input = {
  postId: string;
  data: { title: string; body: string; tags: string[] };
};

export type Output = {
  post: Post;
};

export interface IUpdatePostService {
  run(input: Input): Promise<Output>;
}
