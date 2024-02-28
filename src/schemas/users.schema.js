import { celebrator, Segments, Joi } from "celebrate";
import fileExtensions from "joi-file-extensions";

export default class UserRequestSchema {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  all() {
    return this.celebrate({
      [Segments.QUERY]: {
        page: Joi.number().min(1).default(1),
        per_page: Joi.number().min(1).default(10),
        q: Joi.string().optional(),
      },
    });
  }

  create() {
    const JoiCustom = Joi.extend(fileExtensions);

    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().max(120).required(),
        last_name: Joi.string().max(160).required(),
        username: Joi.string().max(80).required(),
        email: Joi.string().email().max(180).required(),
        password: Joi.string().max(150).required(),
        role_id: Joi.number().min(1).required(),
        // avatar: JoiCustom.file().contents(),
      }),
    });
  }

  update() {
    const JoiCustom = Joi.extend(fileExtensions);

    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().max(120).optional(),
        last_name: Joi.string().max(160).optional(),
        username: Joi.string().max(80).optional(),
        email: Joi.string().email().max(180).optional(),
        role_id: Joi.number().min(1).optional(),
        // avatar: JoiCustom.file().contents().optional(),
      }),
    });
  }
}
