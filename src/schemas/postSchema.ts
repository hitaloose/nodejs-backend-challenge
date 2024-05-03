import { object, string, array } from "yup";

export const postSchema = object({
  title: string().required(),
  body: string().required(),
  tags: array().of(string().required()).required(),
});
