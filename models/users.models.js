import { Model, DataTypes } from "sequelize";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import config from "../config/authConfig";

export default class UserModel extends Model {
  static associate(models) {
    this.belongsTo(models.roles, {
      foreignKey: "role_id",
      targetKey: "id",
    });
  }

  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(120),
        },
        last_name: {
          type: DataTypes.STRING(160),
        },
        username: {
          type: DataTypes.STRING(80),
          unique: true,
        },
        email: {
          type: DataTypes.STRING(180),
          unique: true,
        },
        password: {
          type: DataTypes.STRING(150),
        },
        role_id: {
          type: DataTypes.INTEGER,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "users",
      }
    );
  }

  async hashPassword() {
    const passwordHash = hashSync(
      this.password,
      genSaltSync(config.bcryptRounds)
    );
    this.password = passwordHash;
  }

  async validatePassword(password) {
    return compareSync(password, this.password);
  }
}
