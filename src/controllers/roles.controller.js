import { models } from "../models";
import { StatusCodes } from "http-status-codes";
import {
  paginationFields,
  paginationSerialize,
} from "../helpers/pagination.helper";
import { Op } from "sequelize";
import { RoleNotFound } from "../errors/roles.error";

export default class RoleController {
  constructor() {
    this.model = models.roles;
  }

  // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall
  async fetchAll(req, res) {
    try {
      const { page, per_page, q: search } = req.query;
      // limit | offset
      // Formula (page > 1) | (page <= 1) offset 0
      // page * per_page - per_page
      // =============================
      // 10 | 0 -> Pagina 1
      // 10 | 10 -> Pagina 2
      // 10 | 20 -> Pagina 3
      const { limit, offset } = paginationFields(page, per_page);

      const filters = { status: true };

      if (search) {
        filters[Op.or] = [
          {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ];
      }

      const records = await this.model.findAndCountAll({
        limit,
        offset,
        where: filters,
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
      const { body } = req;
      const record = await this.model.create(body);
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
      const record = await this._findRoleById(id);

      if (!record) {
        throw new RoleNotFound();
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
      const { body, params } = req;
      const { id } = params;
      const record = await this._findRoleById(id);

      if (!record) {
        throw new RoleNotFound();
      }

      record.update(body);
      return res
        .status(StatusCodes.OK)
        .json({ message: `El rol ${record.name} ha sido actualizado` });
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const record = await this._findRoleById(id);

      if (!record) {
        throw new RoleNotFound();
      }

      record.update({ status: false });

      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async _findRoleById(id) {
    return await this.model.findOne({
      where: { status: true, id },
    });
  }
}
