import { components } from "./components";
import { paths } from "./paths";
import { schemas } from "./schemas";

export const document = {
  openapi: "3.0.0",
  info: {
    title: "Desafio técnico Fuerza Studio",
    description:
      "Esta documentação descreve as rotas da API descrita no teste técnico da Fuerza Studio",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/api",
      description: "Servidor Principal",
    },
  ],
  tags: [
    {
      name: "Autenticação",
      description: "APIs relacionadas a Autenticação",
    },
    {
      name: "Posts",
      description: "APIs relacionadas a Post",
    },
  ],
  paths,
  schemas,
  components,
};
