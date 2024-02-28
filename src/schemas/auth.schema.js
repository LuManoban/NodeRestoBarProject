import { celebrator, Segments, Joi } from "celebrate";

export default class AuthRequestSchema {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  login() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    });
  }

  refreshToken() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        refresh_token: Joi.string().required(),
      }),
    });
  }

  resetPassword() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
      }),
    });
  }
}
