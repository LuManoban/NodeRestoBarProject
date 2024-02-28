import { Router } from "express";
import RoleController from "../controllers/roles.controller";
import RoleRequestSchema from "../schemas/roles.schema";
import isAuthenticated from "../middlewares/authentication.middleware";

class RoleRouter {
  constructor() {
    this.router = Router();
    this.controller = new RoleController();
    this.schema = new RoleRequestSchema();
  }

  init() {
    // Global
    // this.router.use(Middleware)
    // this.router.use(isAuthenticated);
    // Por endpoint
    return this.router
      .get("/", [this.schema.all()], (req, res) =>
        this.controller.fetchAll(req, res)
      )
      .post("/", [this.schema.create()], (req, res) =>
        this.controller.save(req, res)
      )
      .get("/:id", (req, res) => this.controller.fetchById(req, res))
      .patch("/:id", [this.schema.update()], (req, res) =>
        this.controller.update(req, res)
      )
      .delete("/:id", (req, res) => this.controller.remove(req, res));
  }
}

export default new RoleRouter();
