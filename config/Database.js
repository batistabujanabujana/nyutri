import { Sequelize } from "sequelize";
const db = new Sequelize("bagus", "root", "coba123", {
  host: "34.31.50.54",
  dialect: "mysql",
});

export default db;
