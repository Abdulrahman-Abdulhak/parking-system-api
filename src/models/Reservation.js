import { Sequelize, DataTypes } from "sequelize" ;

const sequelize = new Sequelize('test', 'munier', 'moner1234', {
    host: 'localhost',
    dialect: 'mysql'
});

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
      model: 'Users', 
      key: 'id',
    },
  },
});

export const createReservationsTable = async () => {
  await Reservation.sync();
};