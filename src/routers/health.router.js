import { Router } from "express";
import { StatusCodes } from "http-status-codes";

class HealthRouter {
  constructor() {
    this.router = Router();
  }

  init() {
    return this.router.get("/", (req, res) => {
      res.status(StatusCodes.OK).send();
    });
  }
}

export default new HealthRouter();
