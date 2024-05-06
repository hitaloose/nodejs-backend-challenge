import { config } from "dotenv";

const envFile =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined
    ? ".env"
    : `.env.${process.env.NODE_ENV}`;

config({ path: envFile });
