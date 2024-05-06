const requiredEnvs = ["PORT", "SALTS", "SECRET"];

for (const requiredEnv of requiredEnvs) {
  if (!process.env[requiredEnv]) {
    throw new Error(`boot aborted, ${requiredEnv} not setted`);
  }
}

export const configs = {
  PAGE_SIZE: 30,
  HTTP_PORT: process.env.PORT!,
  BCRYPT_SALTS: Number(process.env.SALTS),
  JWT_SECRET: process.env.SECRET!,
};
