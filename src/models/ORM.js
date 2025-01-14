import { Sequelize } from "sequelize";

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});
