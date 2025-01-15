import { DataTypes, Model } from "sequelize";
import { ormDriver } from "./ORM.js";

// ! Converted from normal object creation pattern to Singelton Pattern
/**
 * @type {import("sequelize").ModelCtor<Model<any, any>>}
 */
let User = null;
export const createUserModel = () => {
  if (User == null) {
    const orm = ormDriver();

    User = orm.define("User", {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM("Employee", "Visitor"),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      carPlate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  }

  return User;
};

export const createUsersTable = () => {
  return createUserModel().sync();
};
