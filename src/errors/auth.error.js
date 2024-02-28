import { StatusCodes } from "http-status-codes";

export class AuthCredentialsError {
  constructor() {
    this.message = "Las credenciales son incorrectas";
    this.code = StatusCodes.BAD_REQUEST;
  }
}

export class AuthTokenRefreshValidateError {
  constructor() {
    this.message = "El token proporcionado no es el refresh_token";
    this.code = StatusCodes.BAD_REQUEST;
  }
}

export class AuthorizationNotFound {
  constructor() {
    this.message = "No se encuentra la cabecera Authorization";
    this.code = StatusCodes.FORBIDDEN;
  }
}

export class AuthTokenValidateError {
  constructor() {
    this.message = "El token ingresado no es valido";
    this.code = StatusCodes.FORBIDDEN;
  }
}
