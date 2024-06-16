import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    usia: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.BOOLEAN,
    },
    tinggibadan: {
      type: DataTypes.STRING,
    },
    beratbadan: {
      type: DataTypes.STRING,
    },  
    aktivitas: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
