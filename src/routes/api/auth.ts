import { Router } from "express";

import { expressControllerAdapter as adapt } from "@/adapters/expressControllerAdapter";

import { makeLogonController } from "@/factories/controllers/auth/makeLogonController";

export const authRoutes = Router();

authRoutes.post("/logon", adapt(makeLogonController()));
