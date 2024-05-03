import faker from "faker";

import { Post } from "@/models/post";

export const mockPost = (override?: Partial<Post>): Post => {
  return {
    id: faker.datatype.uuid(),
    title: faker.random.words(),
    body: faker.random.words(),
    tags: [faker.random.word(), faker.random.word(), faker.random.word()],
    ...override,
  };
};
