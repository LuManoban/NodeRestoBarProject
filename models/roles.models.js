import { Model, DataTypes } from "sequelize";

export default class RoleModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(80),
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "roles",
        modelName: "roles",
      }
    );
  }
}
