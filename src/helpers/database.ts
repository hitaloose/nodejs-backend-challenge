import { DataSource } from "typeorm";

import { Post } from "@/models/post";
import { User } from "@/models/user";
import { configs } from "./configs";

export const database = new DataSource({
  type: "postgres",
  host: configs.DATABASE.HOST,
  port: Number(configs.DATABASE.PORT),
  username: configs.DATABASE.USERNAME,
  password: configs.DATABASE.PASSWORD,
  database: configs.DATABASE.NAME,
  logging: true,
  entities: [Post, User],
  synchronize: true,
});
