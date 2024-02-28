import { StatusCodes } from "http-status-codes";

export class UserNotFound {
  constructor() {
    this.message = "Usuario no encontrado";
    this.code = StatusCodes.NOT_FOUND;
  }
}
