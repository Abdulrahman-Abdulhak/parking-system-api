import { DataTypes, Model } from "sequelize";
import { ormDriver } from "./ORM.js";

// ! Converted from normal object creation pattern to Singelton Pattern
/**
 * @type {import("sequelize").ModelCtor<Model<any, any>>}
 */
let Reservation = null;

// TODO: add validation.
export const createReservationModel = () => {
  if (Reservation == null) {
    const orm = ormDriver();
    Reservation = orm.define("Reservation", {
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
  }

  return Reservation;
};

export const createReservationsTable = () => {
  return createReservationModel().sync();
};
