import { Router } from "express";

import { expressControllerAdapter as adapt } from "@/adapters/expressControllerAdapter";

import { makeLogonController } from "@/factories/controllers/auth/makeLogonController";
import { makeLoginController } from "@/factories/controllers/auth/makeLoginController";

export const authRoutes = Router();

authRoutes.post("/logon", adapt(makeLogonController()));
authRoutes.post("/login", adapt(makeLoginController()));
