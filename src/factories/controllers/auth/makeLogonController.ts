import { LogonController } from "@/controllers/implementations/auth/LogonController/LogonController";
import { makeLogonService } from "@/factories/services/auth/makeLogonService";

export const makeLogonController = () => {
  return new LogonController(makeLogonService());
};
