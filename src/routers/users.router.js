import { Router } from "express";
import UserController from "../controllers/users.controller";
import UserRequestSchema from "../schemas/users.schema";
import isAuthenticated from "../middlewares/authentication.middleware";

class UserRouter {
  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.schema = new UserRequestSchema();
  }

  init() {
    // Middleware Global
      
      return this.router
      .get("/", [this.schema.all()], (req, res) =>
        this.controller.fetchAll(req, res)
      )
      
      .post("/", [this.schema.create()], (req, res) =>{
        this.controller.save(req, res)
      })
      .use(isAuthenticated)
      
      .get("/:id", (req, res) => this.controller.fetchById(req, res))
     
      .patch("/:id", [this.schema.update()], (req, res) =>
        this.controller.update(req, res)
      )
      
      .delete("/:id", (req, res) => this.controller.remove(req, res));
  }
}

export default new UserRouter();
