import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AuthRequestSchema from "../schemas/auth.schema";

class AuthRouter {
  constructor() {
    this.router = Router();
    this.controller = new AuthController();
    this.schema = new AuthRequestSchema();
  }

  init() {
    return this.router
      .post("/signin", this.schema.login(), (req, res) =>
        this.controller.signIn(req, res)
      )
      .post("/token/refresh", this.schema.refreshToken(), (req, res) =>
        this.controller.refreshToken(req, res)
      )
      .post("/password/reset", this.schema.resetPassword(), (req, res) =>
        this.controller.resetPassword(req, res)
      );
  }
}

export default new AuthRouter();
