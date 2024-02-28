import { readdirSync } from "fs";
import { resolve } from "path";
import config from "../config/databaseConfig";
import Sequelize from "sequelize";

const models = {};
const sequelize = new Sequelize(config[process.env.NODE_ENV]);

readdirSync(__dirname)
  .filter((file) => {
    let fileSplit = file.split(".");
    return fileSplit.length === 3 && fileSplit[1] === "model";
  })
  .forEach((file) => {
    const nameModel = file.split(".")[0];
    const model = require(resolve(__dirname, file));
    models[nameModel] = model.default.init(sequelize);
  });

Object.values(models) // { users: '', roles: '' } -> ['', '']
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

export { models, sequelize };
