const requiredEnvs = ["PORT", "SALTS", "SECRET"];

for (const requiredEnv of requiredEnvs) {
  if (!process.env[requiredEnv]) {
    throw new Error(`boot aborted, ${requiredEnv} not setted`);
  }
}

if (process.env.REPO_IMPL === "typeorm") {
  const requiredTypeORMEnvs = [
    "DB_HOST",
    "DB_PORT",
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_NAME",
  ];

  for (const requiredEnv of requiredTypeORMEnvs) {
    if (!process.env[requiredEnv]) {
      throw new Error(
        `boot aborted, ${requiredEnv} not setted, is required if REPO_IMPL is typeorm`
      );
    }
  }
}

export const configs = {
  PAGE_SIZE: 30,
  HTTP_PORT: process.env.PORT!,
  BCRYPT_SALTS: Number(process.env.SALTS),
  JWT_SECRET: process.env.SECRET!,
  REPO_IMPL: (process.env.REPO_IMPL || "in_memory") as "in_memory" | "typeorm",
  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
};
