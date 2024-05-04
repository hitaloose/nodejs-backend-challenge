export type Input = {
  postId: string;
};

export type Output = void;

export interface IDeletePostService {
  run(input: Input): Promise<Output>;
}
