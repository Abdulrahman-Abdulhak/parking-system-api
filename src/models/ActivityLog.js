import { DataTypes, Model } from 'sequelize';
import { ormDriver } from "./ORM.js";

// ! Converted from normal object creation pattern to Singleton Pattern
/**
 * @type {import("sequelize").ModelCtor<Model<any, any>>}
 */
let ActivityLog = null;

export const createActivityLogModel = () => {
  if (ActivityLog == null) {
    const orm = ormDriver();
    ActivityLog = orm.define('ActivityLog', {
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    });
  }

  return ActivityLog;
};

export const createActivityLogsTable = () => {
  return createActivityLogModel().sync();
};