import { models } from "../models";
import { StatusCodes } from "http-status-codes";
import { createToken, validateToken } from "../helpers/jwt.helper";
import { generate } from "generate-password";
import MailServer from "../providers/mail.provider";
import {
  AuthCredentialsError,
  AuthTokenRefreshValidateError,
} from "../errors/auth.error";
import { UserNotFound } from "../errors/users.error";

export default class AuthController {
  constructor() {
    this.model = models.users;
  }

  async signIn(req, res) {
    try {
      const { username, password } = req.body;
      // 1. Validar si el usuario existe
      const record = await this.model.findOne({
        where: { username, status: true },
      });

      if (!record) {
        throw new UserNotFound();
      }

      // 2. Validar las credenciales
      const validatePassword = await record.validatePassword(password);

      if (!validatePassword) {
        throw new AuthCredentialsError();
      }

      // 3. Crear el token
      const authToken = createToken({ user_id: record.id });

      // 4. Retornar el token (access_token, refresh_token)
      return res.status(StatusCodes.OK).json(authToken);
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refresh_token } = req.body;
      const { user_id, refresh } = validateToken(refresh_token);

      if (!refresh) {
        throw new AuthTokenRefreshValidateError();
      }

      const { access_token } = createToken({ user_id });

      return res.status(StatusCodes.OK).json({ access_token });
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email } = req.body;

      const record = await this.model.findOne({
        where: {
          email,
          status: true,
        },
      });

      if (!record) {
        throw new UserNotFound();
      }

      const newPassword = generate({ length: 8, numbers: true });
      record.password = newPassword;
      await record.hashPassword();

      await MailServer.resetPassword(record.name, record.email, newPassword);

      await record.save();

      return res
        .status(StatusCodes.OK)
        .json({ message: "Se envio un correo con tu nueva contraseña" });
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}
