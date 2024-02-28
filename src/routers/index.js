import { readdirSync } from "fs";
import { resolve } from "path";

export default (express) => {
  // Acceder al modulo routers y Leer el contenido
  readdirSync(__dirname)
    .filter((file) => {
      let fileSplit = file.split(".");
      return fileSplit.length === 3 && fileSplit[1] === "router";
    })
    .forEach((file) => {
      const context = file.split(".")[0];
      const route = require(resolve(__dirname, file));
      express.use(`/${context}`, route.default.init());
    });
};
