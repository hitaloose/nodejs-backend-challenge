import { LoginController } from "@/controllers/implementations/auth/LoginController/LoginController";
import { makeLoginService } from "@/factories/services/auth/makeLoginService";

export const makeLoginController = () => {
  return new LoginController(makeLoginService());
};
