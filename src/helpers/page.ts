import { configs } from "./configs";

export const calculateMaxPage = (count: number) => {
  return Math.ceil(count / configs.PAGE_SIZE);
};
