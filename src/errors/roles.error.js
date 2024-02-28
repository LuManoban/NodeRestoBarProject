import { StatusCodes } from "http-status-codes";

export class RoleNotFound {
  constructor() {
    this.message = "Rol no encontrado";
    this.code = StatusCodes.NOT_FOUND;
  }
}
