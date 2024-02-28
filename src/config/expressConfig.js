import express from "express";
import morgan from "morgan";
import { errors } from "celebrate";
import routersInit from "../routers";
import { StatusCodes } from "http-status-codes";
import fileUpload from "express-fileupload";
import cors from "cors";

export class ExpressConfig {
 
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.middlewares();
    this.routers();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(fileUpload({ debug: true }));
    this.app.use(cors());
  }

  routers() {
    routersInit(this.app);
    this.app.use(errors({ statusCode: StatusCodes.BAD_REQUEST }));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Express running ${this.port} 🚀`);
    });
  }
}
