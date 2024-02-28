import { models } from "../models";
import { StatusCodes } from "http-status-codes";
import {
  paginationFields,
  paginationSerialize,
} from "../helpers/pagination.helper";
import { Op } from "sequelize";
import Bucket from "../providers/bucket.provider";
import { UserNotFound } from "../errors/users.error";

export default class UserController {
  constructor() {
    this.model = models.users;
    // this.bucket = new Bucket("avatar");
  }

  async fetchAll(req, res) {
    try {
      const { page, per_page, q: search } = req.query;
      const { limit, offset } = paginationFields(page, per_page);

      const filters = { status: true };

      if (search) {
        filters[Op.or] = [
          {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            last_name: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            username: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ];
      }

      const records = await this.model.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["password"] },
        where: filters,
        order: [["id", "ASC"]],
        include: [
          {
            model: models.roles,
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          },
        ],
      });
      return res
        .status(StatusCodes.OK)
        .json(paginationSerialize(records, page, per_page));
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async save(req, res) {
    try {
      const { body, files } = req;
      // const avatarUrl = await this.bucket.uploadImage(
      //   files.avatar,
      //   body.username
      // );
      // body["avatar"] = avatarUrl;
      const record = this.model.build(body);
      await record.hashPassword();
      await record.save();
      return res.status(StatusCodes.CREATED).json(record);
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async fetchById(req, res) {
    try {
      const { id } = req.params;
      const record = await this._findUserById(id);

      if (!record) {
        throw new UserNotFound();
      }

      return res.status(StatusCodes.OK).json(record);
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { body, files, params } = req;
      const { id } = params;
      const record = await this._findUserById(id);

      if (!record) {
        throw new UserNotFound();
      }

      // Subir la imagen
      // if (files?.avatar) {
      //   const avatarUrl = await this.bucket.uploadImage(
      //     files.avatar,
      //     record.username
      //   );
      //   body["avatar"] = avatarUrl;
      // }

      record.update(body);
      return res
        .status(StatusCodes.OK)
        .json({ message: `El usuario ${record.username} ha sido actualizado` });
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const record = await this._findUserById(id);

      if (!record) {
        throw new UserNotFound();
      }

      record.update({ status: false });

      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async _findUserById(id) {
    return await this.model.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id,
        status: true,
      },
    });
  }
}
