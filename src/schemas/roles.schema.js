import { celebrator, Segments, Joi } from "celebrate";

export default class RoleRequestSchema {
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
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().max(80).required(),
      }),
    });
  }

  update() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().max(80).optional(),
      }),
    });
  }
}
