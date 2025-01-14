import { DataTypes } from "sequelize";
import { sequelize } from "./ORM.js";

export const Reservation = sequelize.define("Reservation", {
  spotNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservedAt: {
    type: DataTypes.DATE,
    allowNull: false,
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

export const createReservationsTable = () => {
  return Reservation.sync();
};
