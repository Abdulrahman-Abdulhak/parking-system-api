import { Sequelize } from "sequelize";

export const ormDriver = () => {
  const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
  });
  return sequelize;
};
